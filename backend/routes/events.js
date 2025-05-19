const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware } = require("../utils/auth")
const { validateEvent } = require("../utils/validation")
const { upload, processUploadedFile } = require("../utils/upload")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all events
router.get("/", async (req, res) => {
  try {
    // Parse query parameters
    const locationId = req.query.locationId
    const fromDate = req.query.fromDate
    const toDate = req.query.toDate

    // Build query based on parameters
    let sql = `
      SELECT e.id, e.title, e.description, e.event_date, e.location_id, e.created_by, 
             e.image_path, e.status, e.created_at,
             l.name as location_name, l.type as location_type,
             u.name as creator_name
      FROM events e
      LEFT JOIN locations l ON e.location_id = l.id
      LEFT JOIN users u ON e.created_by = u.id
      WHERE 1=1
    `
    const params = []

    if (locationId) {
      sql += " AND e.location_id = ?"
      params.push(locationId)
    }

    if (fromDate) {
      sql += " AND e.event_date >= ?"
      params.push(fromDate)
    }

    if (toDate) {
      sql += " AND e.event_date <= ?"
      params.push(toDate)
    }

    sql += " ORDER BY e.event_date DESC"

    const events = await query(sql, params)

    // Parse JSON fields
    for (const event of events) {
      if (event.image_path) {
        try {
          event.image_path = JSON.parse(event.image_path)
        } catch (e) {
          console.error("Error parsing image_path JSON:", e)
        }
      }
    }

    return res.json({ events })
  } catch (error) {
    console.error("Get events error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Create a new event
router.post("/", auth(), upload.single("image"), async (req, res) => {
  try {
    // Handle file upload if present
    let uploadResult = null
    if (req.file) {
      uploadResult = processUploadedFile(req.file)
    }

    // Get form data or JSON body
    const body = req.file ? req.body : req.body

    // Validate event data
    const validation = validateEvent(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Prepare image path JSON
    const imagePath = uploadResult
      ? JSON.stringify({
          original: uploadResult.filePath,
          thumb: uploadResult.thumbnailPath || uploadResult.filePath,
        })
      : body.image_path
      ? JSON.stringify(body.image_path)
      : null

    // Insert event into database
    const result = await query(
      `INSERT INTO events 
       (title, description, event_date, location_id, created_by, image_path, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.description || null,
        body.event_date,
        body.location_id || null,
        req.user.id,
        imagePath,
        body.status || 1,
      ],
    )

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create event" })
    }

    // Get the created event
    const events = await query(
      `
      SELECT e.id, e.title, e.description, e.event_date, e.location_id, e.created_by, 
             e.image_path, e.status, e.created_at,
             l.name as location_name, l.type as location_type,
             u.name as creator_name
      FROM events e
      LEFT JOIN locations l ON e.location_id = l.id
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.id = ?
    `,
      [result.insertId],
    )

    // Parse JSON fields
    const event = events[0]
    if (event.image_path) {
      try {
        event.image_path = JSON.parse(event.image_path)
      } catch (e) {
        console.error("Error parsing image_path JSON:", e)
      }
    }

    return res.status(201).json({
      message: "Event created successfully",
      event,
    })
  } catch (error) {
    console.error("Create event error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get event by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // Get event from database
    const events = await query(
      `
      SELECT e.id, e.title, e.description, e.event_date, e.location_id, e.created_by, 
             e.image_path, e.status, e.created_at,
             l.name as location_name, l.type as location_type,
             u.name as creator_name
      FROM events e
      LEFT JOIN locations l ON e.location_id = l.id
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.id = ?
    `,
      [id],
    )

    if (events.length === 0) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Parse JSON fields
    const event = events[0]
    if (event.image_path) {
      try {
        event.image_path = JSON.parse(event.image_path)
      } catch (e) {
        console.error("Error parsing image_path JSON:", e)
      }
    }

    return res.json({ event })
  } catch (error) {
    console.error("Get event error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Update event by ID
router.put("/:id", auth(), upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Get event from database
    const events = await query("SELECT * FROM events WHERE id = ?", [id])

    if (events.length === 0) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Check if user is authorized to update this event
    if (events[0].created_by !== currentUser.id && !["Chairman", "Coordinator"].includes(currentUser.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Handle file upload if present
    let uploadResult = null
    if (req.file) {
      uploadResult = processUploadedFile(req.file)
    }

    // Get form data or JSON body
    const body = req.file ? req.body : req.body

    // Validate event data
    const validation = validateEvent(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Build update query
    let sql = "UPDATE events SET "
    const updateFields = []
    const params = []

    if (body.title) {
      updateFields.push("title = ?")
      params.push(body.title)
    }

    if (body.description !== undefined) {
      updateFields.push("description = ?")
      params.push(body.description || null)
    }

    if (body.event_date) {
      updateFields.push("event_date = ?")
      params.push(body.event_date)
    }

    if (body.location_id !== undefined) {
      updateFields.push("location_id = ?")
      params.push(body.location_id || null)
    }

    if (uploadResult || body.image_path) {
      // Prepare image path JSON
      const imagePath = uploadResult
        ? JSON.stringify({
            original: uploadResult.filePath,
            thumb: uploadResult.thumbnailPath || uploadResult.filePath,
          })
        : JSON.stringify(body.image_path)

      updateFields.push("image_path = ?")
      params.push(imagePath)
    }

    if (body.status !== undefined) {
      updateFields.push("status = ?")
      params.push(body.status)
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" })
    }

    sql += updateFields.join(", ")
    sql += " WHERE id = ?"
    params.push(id)

    // Update event in database
    await query(sql, params)

    // Get the updated event
    const updatedEvents = await query(
      `
      SELECT e.id, e.title, e.description, e.event_date, e.location_id, e.created_by, 
             e.image_path, e.status, e.created_at,
             l.name as location_name, l.type as location_type,
             u.name as creator_name
      FROM events e
      LEFT JOIN locations l ON e.location_id = l.id
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.id = ?
    `,
      [id],
    )

    // Parse JSON fields
    const event = updatedEvents[0]
    if (event.image_path) {
      try {
        event.image_path = JSON.parse(event.image_path)
      } catch (e) {
        console.error("Error parsing image_path JSON:", e)
      }
    }

    return res.json({
      message: "Event updated successfully",
      event,
    })
  } catch (error) {
    console.error("Update event error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete event by ID
router.delete("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Get event from database
    const events = await query("SELECT * FROM events WHERE id = ?", [id])

    if (events.length === 0) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Check if user is authorized to delete this event
    if (events[0].created_by !== currentUser.id && !["Chairman", "Coordinator"].includes(currentUser.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Delete event from database
    await query("DELETE FROM events WHERE id = ?", [id])

    return res.json({
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("Delete event error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
