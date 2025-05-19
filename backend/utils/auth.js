const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { query } = require("./db")

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const JWT_EXPIRES_IN = "7d"

// Generate JWT token
function generateToken(userId, role) {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  )
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Compare password with hash
async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash)
}

// Middleware to authenticate requests
async function authenticate(req) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.split(" ")[1]
  const decoded = verifyToken(token)

  if (!decoded) {
    return null
  }

  // Get user from database
  try {
    const users = await query("SELECT id, name, role, email, phone, status FROM users WHERE id = ?", [decoded.userId])

    if (users.length === 0 || users[0].status !== 1) {
      return null
    }

    return users[0]
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

// Middleware to check if user has required role 
function checkRole(user, roles) {
  return user && roles.includes(user.role)
}

// Create a middleware to protect routes
async function authMiddleware(req, res, next, roles = []) {
  try {
    const user = await authenticate(req)

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    if (roles.length > 0 && !checkRole(user, roles)) {
      return res.status(403).json({ message: "Forbidden" })
    }

    // Attach user to request object
    req.user = user
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  authenticate,
  checkRole,
  authMiddleware,
}
