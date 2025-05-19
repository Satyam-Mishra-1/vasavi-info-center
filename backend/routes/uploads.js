const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware } = require("../utils/auth")
const { upload, processUploadedFile, deleteFile } = require("../utils/upload")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all uploads
router.get("/", auth(), async (req, res) => {
  try {
    const currentUser = req.user

    // Parse query parameters
    const uploaderId = req.query.uploaderId
    const serviceUnitId = req.query.serviceUnitId

    // Build query based on parameters
    let sql = `
      SELECT u.id, u.uploader_id, u.service_unit_id, u.file_path, u.uploaded_at,
             usr.name as uploader_name,
             su.name as service_unit_name
      FROM uploads u
      LEFT JOIN users usr ON u.uploader_id = usr.id
      LEFT JOIN service_units su ON u.service_unit_id = su.id
      WHERE 1=1
    `
    const params = []

    // Regular users can only see their own uploads
    if (!["Chairman", "Coordinator"].includes(currentUser.role)) {
      sql += " AND u.uploader_id = ?"
      params.push(currentUser.id)
    } else if (uploaderId) {
      sql += " AND u.uploader_id = ?"
      params.push(uploaderId)
    }

    if (serviceUnitId) {
      sql += " AND u.service_unit_id = ?"
      params.push(serviceUnitId)
    }

    sql += " ORDER BY u.uploaded_at DESC"

    const uploads = await query(sql, params)

    // Parse JSON fields
    for (const upload of uploads) {
      if (upload.file_path) {
        try {
          upload.file_path = JSON.parse(upload.file_path)
        } catch (e) {
          console.error("Error parsing file_path JSON:", e)
        }
      }
    }

    return res.json({ uploads })
  } catch (error) {
    console.error("Get uploads error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Upload a new file
router.post("/", auth(), upload.single("file"), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    // Process uploaded file
    const uploadResult = processUploadedFile(req.file)

    // Get service unit ID from form data
    const serviceUnitId = req.body.service_unit_id ? Number.parseInt(req.body.service_unit_id) : null

    // Prepare file path JSON
    const filePath = JSON.stringify({
      original: uploadResult.filePath,
      thumb: uploadResult.thumbnailPath || uploadResult.filePath,
    })

    // Insert upload into database
    const result = await query(
      `INSERT INTO uploads 
       (uploader_id, service_unit_id, file_path) 
       VALUES (?, ?, ?)`,
      [req.user.id, serviceUnitId, filePath],
    )

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create upload record" })
    }

    // Get the created upload
    const uploads = await query(
      `
      SELECT u.id, u.uploader_id, u.service_unit_id, u.file_path, u.uploaded_at,
             usr.name as uploader_name,
             su.name as service_unit_name
      FROM uploads u
      LEFT JOIN users usr ON u.uploader_id = usr.id
      LEFT JOIN service_units su ON u.service_unit_id = su.id
      WHERE u.id = ?
    `,
      [result.insertId],
    )

    // Parse JSON fields
    const upload = uploads[0]
    if (upload.file_path) {
      try {
        upload.file_path = JSON.parse(upload.file_path)
      } catch (e) {
        console.error("Error parsing file_path JSON:", e)
      }
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      upload,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get upload by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Get upload from database
    const uploads = await query(
      `
      SELECT u.id, u.uploader_id, u.service_unit_id, u.file_path, u.uploaded_at,
             usr.name as uploader_name,
             su.name as service_unit_name
      FROM uploads u
      LEFT JOIN users usr ON u.uploader_id = usr.id
      LEFT JOIN service_units su ON u.service_unit_id = su.id
      WHERE u.id = ?
    `,
      [id],
    )

    if (uploads.length === 0) {
      return res.status(404).json({ message: "Upload not found" })
    }

    // Regular users can only see their own uploads
    if (!["Chairman", "Coordinator"].includes(currentUser.role) && uploads[0].uploader_id !== currentUser.id) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Parse JSON fields
    const upload = uploads[0]
    if (upload.file_path) {
      try {
        upload.file_path = JSON.parse(upload.file_path)
      } catch (e) {
        console.error("Error parsing file_path JSON:", e)
      }
    }

    return res.json({ upload })
  } catch (error) {
    console.error("Get upload error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete upload by ID
router.delete("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Get upload from database
    const uploads = await query("SELECT * FROM uploads WHERE id = ?", [id])

    if (uploads.length === 0) {
      return res.status(404).json({ message: "Upload not found" })
    }

    // Regular users can only delete their own uploads
    if (!["Chairman", "Coordinator"].includes(currentUser.role) && uploads[0].uploader_id !== currentUser.id) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Delete file from storage
    const upload = uploads[0]
    if (upload.file_path) {
      try {
        const filePath = JSON.parse(upload.file_path)
        if (filePath.original) {
          deleteFile(filePath.original)
        }
        if (filePath.thumb && filePath.thumb !== filePath.original) {
          deleteFile(filePath.thumb)
        }
      } catch (e) {
        console.error("Error deleting files:", e)
      }
    }

    // Delete upload from database
    await query("DELETE FROM uploads WHERE id = ?", [id])

    return res.json({
      message: "Upload deleted successfully",
    })
  } catch (error) {
    console.error("Delete upload error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
