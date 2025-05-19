const express = require("express")
const router = express.Router()
const { query } = require("../utils/db")
const { hashPassword, comparePassword, generateToken } = require("../utils/auth")
const { validateUser } = require("../utils/validation")

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const body = req.body

    // Validate user input
    const validation = validateUser(body)
    if (!validation.valid) {
      return res.status(400).json({ message: "Validation failed", errors: validation.errors })
    }

    // Check if user already exists
    const existingUsers = await query("SELECT * FROM users WHERE phone = ? OR (email = ? AND email IS NOT NULL)", [
      body.phone,
      body.email || "",
    ])

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "User with this phone or email already exists" })
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password)

    // Prepare profile image JSON if provided
    let profileImage = null
    if (body.profile_image) {
      profileImage = JSON.stringify(body.profile_image)
    }

    // Insert user into database
    const result = await query(
      `INSERT INTO users 
       (name, role, phone, email, password_hash, profile_image, location_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.name,
        body.role,
        body.phone,
        body.email || null,
        hashedPassword,
        profileImage,
        body.location_id || null,
        body.status || 1,
      ],
    )

    if (!result.insertId) {
      return res.status(500).json({ message: "Failed to create user" })
    }

    // Return success response
    return res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

















router.post("/login", async (req, res) => {
  try {
    const body = req.body

    // Validate required fields
    if (!body.phone && !body.email) {
      return res.status(400).json({ message: "Phone or email is required" })
    }

    if (!body.password) {
      return res.status(400).json({ message: "Password is required" })
    }

    // Find user by phone or email
    let sql, params
    if (body.phone) {
      sql = "SELECT * FROM users WHERE phone = ? AND status = 1"
      params = [body.phone]
    } else {
      sql = "SELECT * FROM users WHERE email = ? AND status = 1"
      params = [body.email]
    }

    const users = await query(sql, params)

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const user = users[0]

    // Verify password
    const isPasswordValid = await comparePassword(body.password, user.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = generateToken(user.id, user.role)

    // Return user data and token
    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})











// Get current user
router.get("/me", async (req, res) => {
  try {
    // Create middleware wrapper for Express compatibility
    const authMiddlewareWrapper = require("../utils/auth").authMiddleware

    authMiddlewareWrapper(req, res, () => {
      // This will only execute if authentication is successful
      res.json({
        user: {
          id: req.user.id,
          name: req.user.name,
          role: req.user.role,
          email: req.user.email,
          phone: req.user.phone,
        },
      })
    })
  } catch (error) {
    console.error("Get user error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router
