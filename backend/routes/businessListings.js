const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware } = require("../utils/auth")
const { validateBusinessListing } = require("../utils/validation")
const { upload, processUploadedFile } = require("../utils/upload")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all business listings
router.get("/", async (req, res) => {
  try {
    // Parse query parameters
    const categoryId = req.query.categoryId
    const locationId = req.query.locationId
    const userId = req.query.userId

    // Build query based on parameters
    let sql = `
      SELECT bl.id, bl.user_id, bl.category_id, bl.business_name, bl.description, 
             bl.phone, bl.email, bl.website, bl.location_id, bl.logo_path, bl.status, bl.created_at,
             bc.name as category_name,
             l.name as location_name, l.type as location_type,
             u.name as user_name
      FROM business_listings bl
      LEFT JOIN business_categories bc ON bl.category_id = bc.id
      LEFT JOIN locations l ON bl.location_id = l.id
      LEFT JOIN users u ON bl.user_id = u.id
      WHERE 1=1
    `
    const params = []

    if (categoryId) {
      sql += " AND bl.category_id = ?"
      params.push(categoryId)
    }

    if (locationId) {
      sql += " AND bl.location_id = ?"
      params.push(locationId)
    }

    if (userId) {
      sql += " AND bl.user_id = ?"
      params.push(userId)
    }

    sql += " ORDER BY bl.business_name ASC"

    const businessListings = await query(sql, params)

    // Parse JSON fields
    for (const listing of businessListings) {
      if (listing.logo_path) {
        try {
          listing.logo_path = JSON.parse(listing.logo_path)
        } catch (e) {
          console.error("Error parsing logo_path JSON:", e)
        }
      }
    }

    return res.json({ businessListings })
  } catch (error) {
    console.error("Get business listings error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Create a new business listing
router.post("/", auth(), upload.single("logo"), async (req, res) => {
  try {
    // Handle file upload if present
    let uploadResult = null
    if (req.file) {
      uploadResult = processUploadedFile(req.file)
    }

    // Get form data or JSON body
    const body = req.file ? req.body : req.body

    // Validate business listing data
    const validation = validateBusinessListing(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Prepare logo path JSON
    const logoPath = uploadResult
      ? JSON.stringify({
          original: uploadResult.filePath,
          thumb: uploadResult.thumbnailPath || uploadResult.filePath,
        })
      : body.logo_path
      ? JSON.stringify(body.logo_path)
      : null

    // Insert business listing into database
    const result = await query(
      `INSERT INTO business_listings 
       (user_id, category_id, business_name, description, phone, email, website, location_id, logo_path, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        body.category_id || null,
        body.business_name,
        body.description || null,
        body.phone || null,
        body.email || null,
        body.website || null,
        body.location_id || null,
        logoPath,
        body.status || 1,
      ],
    )

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create business listing" })
    }

    // Get the created business listing
    const businessListings = await query(
      `
      SELECT bl.id, bl.user_id, bl.category_id, bl.business_name, bl.description, 
             bl.phone, bl.email, bl.website, bl.location_id, bl.logo_path, bl.status, bl.created_at,
             bc.name as category_name,
             l.name as location_name, l.type as location_type,
             u.name as user_name
      FROM business_listings bl
      LEFT JOIN business_categories bc ON bl.category_id = bc.id
      LEFT JOIN locations l ON bl.location_id = l.id
      LEFT JOIN users u ON bl.user_id = u.id
      WHERE bl.id = ?
    `,
      [result.insertId],
    )

    // Parse JSON fields
    const businessListing = businessListings[0]
    if (businessListing.logo_path) {
      try {
        businessListing.logo_path = JSON.parse(businessListing.logo_path)
      } catch (e) {
        console.error("Error parsing logo_path JSON:", e)
      }
    }

    return res.status(201).json({
      message: "Business listing created successfully",
      businessListing,
    })
  } catch (error) {
    console.error("Create business listing error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get business listing by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // Get business listing from database
    const businessListings = await query(
      `
      SELECT bl.id, bl.user_id, bl.category_id, bl.business_name, bl.description, 
             bl.phone, bl.email, bl.website, bl.location_id, bl.logo_path, bl.status, bl.created_at,
             bc.name as category_name,
             l.name as location_name, l.type as location_type,
             u.name as user_name
      FROM business_listings bl
      LEFT JOIN business_categories bc ON bl.category_id = bc.id
      LEFT JOIN locations l ON bl.location_id = l.id
      LEFT JOIN users u ON bl.user_id = u.id
      WHERE bl.id = ?
    `,
      [id],
    )

    if (businessListings.length === 0) {
      return res.status(404).json({ message: "Business listing not found" })
    }

    // Parse JSON fields
    const businessListing = businessListings[0]
    if (businessListing.logo_path) {
      try {
        businessListing.logo_path = JSON.parse(businessListing.logo_path)
      } catch (e) {
        console.error("Error parsing logo_path JSON:", e)
      }
    }

    return res.json({ businessListing })
  } catch (error) {
    console.error("Get business listing error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Update business listing by ID
router.put("/:id", auth(), upload.single("logo"), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Get business listing from database
    const businessListings = await query("SELECT * FROM business_listings WHERE id = ?", [id])

    if (businessListings.length === 0) {
      return res.status(404).json({ message: "Business listing not found" })
    }

    // Check if user is authorized to update this business listing
    if (businessListings[0].user_id !== currentUser.id && !["Chairman", "Coordinator"].includes(currentUser.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Handle file upload if present
    let uploadResult = null
    if (req.file) {
      uploadResult = processUploadedFile(req.file)
    }

    // Get form data or JSON body
    const body = req.file ? req.body : req.body

    // Validate business listing data
    const validation = validateBusinessListing(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Build update query
    let sql = "UPDATE business_listings SET "
    const updateFields = []
    const params = []

    if (body.business_name) {
      updateFields.push("business_name = ?")
      params.push(body.business_name)
    }

    if (body.description !== undefined) {
      updateFields.push("description = ?")
      params.push(body.description || null)
    }

    if (body.category_id !== undefined) {
      updateFields.push("category_id = ?")
      params.push(body.category_id || null)
    }

    if (body.phone !== undefined) {
      updateFields.push("phone = ?")
      params.push(body.phone || null)
    }

    if (body.email !== undefined) {
      updateFields.push("email = ?")
      params.push(body.email || null)
    }

    if (body.website !== undefined) {
      updateFields.push("website = ?")
      params.push(body.website || null)
    }

    if (body.location_id !== undefined) {
      updateFields.push("location_id = ?")
      params.push(body.location_id || null)
    }

    if (uploadResult || body.logo_path) {
      // Prepare logo path JSON
      const logoPath = uploadResult
        ? JSON.stringify({
            original: uploadResult.filePath,
            thumb: uploadResult.thumbnailPath || uploadResult.filePath,
          })
        : JSON.stringify(body.logo_path)

      updateFields.push("logo_path = ?")
      params.push(logoPath)
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

    // Update business listing in database
    await query(sql, params)

    // Get the updated business listing
    const updatedBusinessListings = await query(
      `
      SELECT bl.id, bl.user_id, bl.category_id, bl.business_name, bl.description, 
             bl.phone, bl.email, bl.website, bl.location_id, bl.logo_path, bl.status, bl.created_at,
             bc.name as category_name,
             l.name as location_name, l.type as location_type,
             u.name as user_name
      FROM business_listings bl
      LEFT JOIN business_categories bc ON bl.category_id = bc.id
      LEFT JOIN locations l ON bl.location_id = l.id
      LEFT JOIN users u ON bl.user_id = u.id
      WHERE bl.id = ?
    `,
      [id],
    )

    // Parse JSON fields
    const businessListing = updatedBusinessListings[0]
    if (businessListing.logo_path) {
      try {
        businessListing.logo_path = JSON.parse(businessListing.logo_path)
      } catch (e) {
        console.error("Error parsing logo_path JSON:", e)
      }
    }

    return res.json({
      message: "Business listing updated successfully",
      businessListing,
    })
  } catch (error) {
    console.error("Update business listing error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete business listing by ID
router.delete("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Get business listing from database
    const businessListings = await query("SELECT * FROM business_listings WHERE id = ?", [id])

    if (businessListings.length === 0) {
      return res.status(404).json({ message: "Business listing not found" })
    }

    // Check if user is authorized to delete this business listing
    if (businessListings[0].user_id !== currentUser.id && !["Chairman", "Coordinator"].includes(currentUser.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Delete business listing from database
    await query("DELETE FROM business_listings WHERE id = ?", [id])

    return res.json({
      message: "Business listing deleted successfully",
    })
  } catch (error) {
    console.error("Delete business listing error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
