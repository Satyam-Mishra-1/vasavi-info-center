const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { authMiddleware, hashPassword } = require("../utils/auth")
const { validateUser } = require("../utils/validation")

// Middleware to check authentication
function auth(roles = []) {
  return (req, res, next) => {
    authMiddleware(req, res, next, roles)
  }
}

// Get all users
router.get("/", auth(["Chairman", "Coordinator"]), async (req, res) => {
  try {
    // Parse query parameters
    const role = req.query.role
    const locationId = req.query.locationId

    // Build query based on parameters
    let sql = `
      SELECT u.id, u.name, u.role, u.phone, u.email, u.status, u.created_at, 
             l.name as location_name, l.type as location_type
      FROM users u
      LEFT JOIN locations l ON u.location_id = l.id
      WHERE 1=1
    `
    const params = []

    if (role) {
      sql += " AND u.role = ?"
      params.push(role)
    }

    if (locationId) {
      sql += " AND u.location_id = ?"
      params.push(locationId)
    }

    sql += " ORDER BY u.name ASC"

    const users = await query(sql, params)

    return res.json({ users })
  } catch (error) {
    console.error("Get users error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Get user by ID
router.get("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user

    // Users can only view their own profile unless they are Chairman or Coordinator
    if (currentUser.id.toString() !== id && !["Chairman", "Coordinator"].includes(currentUser.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Get user from database
    const users = await query(
      `
      SELECT u.id, u.name, u.role, u.phone, u.email, u.profile_image, u.status, u.created_at,
             l.id as location_id, l.name as location_name, l.type as location_type
      FROM users u
      LEFT JOIN locations l ON u.location_id = l.id
      WHERE u.id = ?
    `,
      [id],
    )

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    // Parse JSON fields
    const user = users[0]
    if (user.profile_image) {
      try {
        user.profile_image = JSON.parse(user.profile_image)
      } catch (e) {
        console.error("Error parsing profile_image JSON:", e)
      }
    }

    return res.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Update user by ID
router.put("/:id", auth(), async (req, res) => {
  try {
    const id = req.params.id
    const currentUser = req.user
    const body = req.body

    // Users can only update their own profile unless they are Chairman or Coordinator
    if (currentUser.id.toString() !== id && !["Chairman", "Coordinator"].includes(currentUser.role)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Validate user data
    const validation = validateUser(body, true)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Check if user exists
    const users = await query("SELECT * FROM users WHERE id = ?", [id])

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    // Build update query
    let sql = "UPDATE users SET "
    const updateFields = []
    const paramsArr = []

    if (body.name) {
      updateFields.push("name = ?")
      paramsArr.push(body.name)
    }

    // Only Chairman/Coordinator can update role
    if (body.role && ["Chairman", "Coordinator"].includes(currentUser.role)) {
      updateFields.push("role = ?")
      paramsArr.push(body.role)
    }

    if (body.phone) {
      // Check if phone is already used by another user
      const existingUsers = await query("SELECT * FROM users WHERE phone = ? AND id != ?", [body.phone, id])

      if (existingUsers.length > 0) {
        return res.status(409).json({ message: "Phone number already in use" })
      }

      updateFields.push("phone = ?")
      paramsArr.push(body.phone)
    }

    if (body.email) {
      // Check if email is already used by another user
      const existingUsers = await query("SELECT * FROM users WHERE email = ? AND id != ?", [body.email, id])

      if (existingUsers.length > 0) {
        return res.status(409).json({ message: "Email already in use" })
      }

      updateFields.push("email = ?")
      paramsArr.push(body.email)
    }

    if (body.password) {
      const hashedPassword = await hashPassword(body.password)
      updateFields.push("password_hash = ?")
      paramsArr.push(hashedPassword)
    }

    if (body.profile_image) {
      updateFields.push("profile_image = ?")
      paramsArr.push(JSON.stringify(body.profile_image))
    }

    // Only Chairman/Coordinator can update location and status
    if (body.location_id !== undefined && ["Chairman", "Coordinator"].includes(currentUser.role)) {
      updateFields.push("location_id = ?")
      paramsArr.push(body.location_id || null)
    }

    if (body.status !== undefined && ["Chairman", "Coordinator"].includes(currentUser.role)) {
      updateFields.push("status = ?")
      paramsArr.push(body.status)
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" })
    }

    sql += updateFields.join(", ")
    sql += " WHERE id = ?"
    paramsArr.push(id)

    // Update user in database
    await query(sql, paramsArr)

    // Get the updated user
    const updatedUsers = await query(
      `
      SELECT u.id, u.name, u.role, u.phone, u.email, u.profile_image, u.status, u.created_at,
             l.id as location_id, l.name as location_name, l.type as location_type
      FROM users u
      LEFT JOIN locations l ON u.location_id = l.id
      WHERE u.id = ?
    `,
      [id],
    )

    // Parse JSON fields
    const user = updatedUsers[0]
    if (user.profile_image) {
      try {
        user.profile_image = JSON.parse(user.profile_image)
      } catch (e) {
        console.error("Error parsing profile_image JSON:", e)
      }
    }

    return res.json({
      message: "User updated successfully",
      user,
    })
  } catch (error) {
    console.error("Update user error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

// Delete user by ID
router.delete("/:id", auth(["Chairman"]), async (req, res) => {
  try {
    const id = req.params.id

    // Check if user exists
    const users = await query("SELECT * FROM users WHERE id = ?", [id])

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    // Delete user from database
    await query("DELETE FROM users WHERE id = ?", [id])

    return res.json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Delete user error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
