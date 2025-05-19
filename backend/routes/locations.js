const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware } = require("../utils/auth")
const { validateLocation } = require("../utils/validation")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all locations
// router.get('/', async (req, res) => {
//   try {\
//       res, next, roles);
//   };
// }

// Get all locations
router.get('/', async (req, res) => {
  try {
    // Parse query parameters
    const type = req.query.type;
    const parentId = req.query.parentId;

    // Build query based on parameters
    let sql = "SELECT * FROM locations WHERE status = 1";
    const params = [];

    if (type) {
      sql += " AND type = ?";
      params.push(type);
    }

    if (parentId) {
      sql += " AND parent_id = ?";
      params.push(parentId);
    } else if (parentId === "null") {
      sql += " AND parent_id IS NULL";
    }

    sql += " ORDER BY name ASC";

    const locations = await query(sql, params);

    return res.json({ locations });
  } catch (error) {
    console.error('Get locations error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new location
router.post("/", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    const body = req.body

    // Validate location data
    const validation = validateLocation(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Check if location already exists
    const existingLocations = await query(
      "SELECT * FROM locations WHERE name = ? AND type = ? AND (parent_id = ? OR (parent_id IS NULL AND ? IS NULL))",
      [body.name, body.type, body.parent_id || null, body.parent_id],
    )

    if (existingLocations.length > 0) {
      return res.status(409).json({ message: "Location already exists" })
    }

    // Insert location into database
    const result = await query("INSERT INTO locations (name, parent_id, type, status) VALUES (?, ?, ?, ?)", [
      body.name,
      body.parent_id || null,
      body.type,
      body.status || 1,
    ])

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create location" })
    }

    // Get the created location
    const locations = await query("SELECT * FROM locations WHERE id = ?", [result.insertId])

    return res.status(201).json({
      message: "Location created successfully",
      location: locations[0],
    })
  } catch (error) {
    console.error("Create location error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get location by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    // Get location from database
    const locations = await query("SELECT * FROM locations WHERE id = ?", [id])

    if (locations.length === 0) {
      return res.status(404).json({ message: "Location not found" })
    }

    return res.json({ location: locations[0] })
  } catch (error) {
    console.error("Get location error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Update location by ID
router.put("/:id", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    // Validate location data
    const validation = validateLocation(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Check if location exists
    const locations = await query("SELECT * FROM locations WHERE id = ?", [id])

    if (locations.length === 0) {
      return res.status(404).json({ message: "Location not found" })
    }

    // Update location in database
    await query("UPDATE locations SET name = ?, parent_id = ?, type = ?, status = ? WHERE id = ?", [
      body.name,
      body.parent_id || null,
      body.type,
      body.status || 1,
      id,
    ])

    // Get the updated location
    const updatedLocations = await query("SELECT * FROM locations WHERE id = ?", [id])

    return res.json({
      message: "Location updated successfully",
      location: updatedLocations[0],
    })
  } catch (error) {
    console.error("Update location error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete location by ID
router.delete("/:id", auth(["Chairman"]), async (req, res) => {
  try {
    const id = req.params.id

    // Check if location exists
    const locations = await query("SELECT * FROM locations WHERE id = ?", [id])

    if (locations.length === 0) {
      return res.status(404).json({ message: "Location not found" })
    }

    // Check if location has children
    const children = await query("SELECT * FROM locations WHERE parent_id = ?", [id])

    if (children.length > 0) {
      return res.status(400).json({ message: "Cannot delete location with children" })
    }

    // Delete location from database
    await query("DELETE FROM locations WHERE id = ?", [id])

    return res.json({
      message: "Location deleted successfully",
    })
  } catch (error) {
    console.error("Delete location error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
