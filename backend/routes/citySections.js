const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware } = require("../utils/auth")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all city sections
router.get("/", async (req, res) => {
  try {
    // Parse query parameters
    const cityId = req.query.cityId
    const sectionId = req.query.sectionId

    // Build query based on parameters
    let sql = `
      SELECT cs.id, cs.city_id, cs.section_id, cs.status, cs.created_at,
             l.name as city_name, s.name as section_name, s.description as section_description
      FROM city_sections cs
      JOIN locations l ON cs.city_id = l.id
      JOIN sections s ON cs.section_id = s.id
      WHERE 1=1
    `
    const params = []

    if (cityId) {
      sql += " AND cs.city_id = ?"
      params.push(cityId)
    }

    if (sectionId) {
      sql += " AND cs.section_id = ?"
      params.push(sectionId)
    }

    sql += " ORDER BY l.name ASC, s.name ASC"

    const citySections = await query(sql, params)

    return res.json({ citySections })
  } catch (error) {
    console.error("Get city sections error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Create a new city section
router.post("/", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    const body = req.body

    // Validate required fields
    if (!body.city_id || !body.section_id) {
      return res.status(400).json({ message: "City ID and Section ID are required" })
    }

    // Check if city exists
    const cities = await query('SELECT * FROM locations WHERE id = ? AND type = "City"', [body.city_id])

    if (cities.length === 0) {
      return res.status(404).json({ message: "City not found" })
    }

    // Check if section exists
    const sections = await query("SELECT * FROM sections WHERE id = ?", [body.section_id])

    if (sections.length === 0) {
      return res.status(404).json({ message: "Section not found" })
    }

    // Check if city section already exists
    const existingCitySections = await query("SELECT * FROM city_sections WHERE city_id = ? AND section_id = ?", [
      body.city_id,
      body.section_id,
    ])

    if (existingCitySections.length > 0) {
      return res.status(409).json({ message: "City section already exists" })
    }

    // Insert city section into database
    const result = await query("INSERT INTO city_sections (city_id, section_id, status) VALUES (?, ?, ?)", [
      body.city_id,
      body.section_id,
      body.status || 1,
    ])

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create city section" })
    }

    // Get the created city section
    const citySections = await query(
      `
      SELECT cs.id, cs.city_id, cs.section_id, cs.status, cs.created_at,
             l.name as city_name, s.name as section_name, s.description as section_description
      FROM city_sections cs
      JOIN locations l ON cs.city_id = l.id
      JOIN sections s ON cs.section_id = s.id
      WHERE cs.id = ?
    `,
      [result.insertId],
    )

    return res.status(201).json({
      message: "City section created successfully",
      citySection: citySections[0],
    })
  } catch (error) {
    console.error("Create city section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get city section by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // Get city section from database
    const citySections = await query(
      `
      SELECT cs.id, cs.city_id, cs.section_id, cs.status, cs.created_at,
             l.name as city_name, s.name as section_name, s.description as section_description
      FROM city_sections cs
      JOIN locations l ON cs.city_id = l.id
      JOIN sections s ON cs.section_id = s.id
      WHERE cs.id = ?
    `,
      [id],
    )

    if (citySections.length === 0) {
      return res.status(404).json({ message: "City section not found" })
    }

    return res.json({ citySection: citySections[0] })
  } catch (error) {
    console.error("Get city section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Update city section by ID
router.put("/:id", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    // Check if city section exists
    const citySections = await query("SELECT * FROM city_sections WHERE id = ?", [id])

    if (citySections.length === 0) {
      return res.status(404).json({ message: "City section not found" })
    }

    // Update city section in database
    await query("UPDATE city_sections SET status = ? WHERE id = ?", [body.status || 1, id])

    // Get the updated city section
    const updatedCitySections = await query(
      `
      SELECT cs.id, cs.city_id, cs.section_id, cs.status, cs.created_at,
             l.name as city_name, s.name as section_name, s.description as section_description
      FROM city_sections cs
      JOIN locations l ON cs.city_id = l.id
      JOIN sections s ON cs.section_id = s.id
      WHERE cs.id = ?
    `,
      [id],
    )

    return res.json({
      message: "City section updated successfully",
      citySection: updatedCitySections[0],
    })
  } catch (error) {
    console.error("Update city section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete city section by ID
router.delete("/:id", auth(["Chairman"]), async (req, res) => {
  try {
    const id = req.params.id

    // Check if city section exists
    const citySections = await query("SELECT * FROM city_sections WHERE id = ?", [id])

    if (citySections.length === 0) {
      return res.status(404).json({ message: "City section not found" })
    }

    // Check if city section is used in service_units
    const serviceUnits = await query("SELECT * FROM service_units WHERE city_section_id = ?", [id])

    if (serviceUnits.length > 0) {
      return res.status(400).json({ message: "Cannot delete city section that is in use" })
    }

    // Delete city section from database
    await query("DELETE FROM city_sections WHERE id = ?", [id])

    return res.json({
      message: "City section deleted successfully",
    })
  } catch (error) {
    console.error("Delete city section error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
