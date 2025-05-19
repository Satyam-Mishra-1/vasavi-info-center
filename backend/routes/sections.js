const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware } = require("../utils/auth")
const { validateSection } = require("../utils/validation")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all sections
router.get("/", async (req, res) => {
  try {
    // Parse query parameters
    const status = req.query.status

    // Build query based on parameters
    let sql = "SELECT * FROM sections"
    const params = []

    if (status) {
      sql += " WHERE status = ?"
      params.push(Number.parseInt(status))
    }

    sql += " ORDER BY name ASC"

    const sections = await query(sql, params)

    return res.json({ sections })
  } catch (error) {
    console.error("Get sections error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Create a new section
router.post("/", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    const body = req.body

    // Validate section data
    const validation = validateSection(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Check if section already exists
    const existingSections = await query("SELECT * FROM sections WHERE name = ?", [body.name])

    if (existingSections.length > 0) {
      return res.status(409).json({ message: "Section already exists" })
    }

    // Insert section into database
    const result = await query("INSERT INTO sections (name, description, status) VALUES (?, ?, ?)", [
      body.name,
      body.description || null,
      body.status || 1,
    ])

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create section" })
    }

    // Get the created section
    const sections = await query("SELECT * FROM sections WHERE id = ?", [result.insertId])

    return res.status(201).json({
      message: "Section created successfully",
      section: sections[0],
    })
  } catch (error) {
    console.error("Create section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get section by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // Get section from database
    const sections = await query("SELECT * FROM sections WHERE id = ?", [id])

    if (sections.length === 0) {
      return res.status(404).json({ message: "Section not found" })
    }

    return res.json({ section: sections[0] })
  } catch (error) {
    console.error("Get section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Update section by ID
router.put("/:id", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    // Validate section data
    const validation = validateSection(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Check if section exists
    const sections = await query("SELECT * FROM sections WHERE id = ?", [id])

    if (sections.length === 0) {
      return res.status(404).json({ message: "Section not found" })
    }

    // Update section in database
    await query("UPDATE sections SET name = ?, description = ?, status = ? WHERE id = ?", [
      body.name,
      body.description || null,
      body.status || 1,
      id,
    ])

    // Get the updated section
    const updatedSections = await query("SELECT * FROM sections WHERE id = ?", [id])

    return res.json({
      message: "Section updated successfully",
      section: updatedSections[0],
    })
  } catch (error) {
    console.error("Update section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete section by ID
router.delete("/:id", auth(["Chairman"]), async (req, res) => {
  try {
    const id = req.params.id

    // Check if section exists
    const sections = await query("SELECT * FROM sections WHERE id = ?", [id])

    if (sections.length === 0) {
      return res.status(404).json({ message: "Section not found" })
    }

    // Check if section is used in city_sections
    const citySections = await query("SELECT * FROM city_sections WHERE section_id = ?", [id])

    if (citySections.length > 0) {
      return res.status(400).json({ message: "Cannot delete section that is in use" })
    }

    // Delete section from database
    await query("DELETE FROM sections WHERE id = ?", [id])

    return res.json({
      message: "Section deleted successfully",
    })
  } catch (error) {
    console.error("Delete section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
