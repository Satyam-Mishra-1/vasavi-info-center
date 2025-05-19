const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config()

// Import routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const locationRoutes = require("./routes/locations")
const sectionRoutes = require("./routes/sections")
const citySectionRoutes = require("./routes/citySections")
const eventRoutes = require("./routes/events")
const businessListingRoutes = require("./routes/businessListings")
const uploadRoutes = require("./routes/uploads")
// const serviceUnitRoutes = require("./routes/serviceUnits")
// const classifiedRoutes = require("./routes/classifieds")
// const subscriptionRoutes = require("./routes/subscriptions")
// const businessCategoryRoutes = require("./routes/businessCategories")
// const adminCenterRoutes = require("./routes/adminCenters")
// const postRoutes = require("./routes/posts")
// const postCategoryRoutes = require("./routes/postCategories")
// const citySectionPromoterRoutes = require("./routes/citySectionPromoters")

// Import database connection
const { testConnection } = require("./utils/db")

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

// Serve static files from public directory
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/locations", locationRoutes)
app.use("/api/sections", sectionRoutes)
app.use("/api/city-sections", citySectionRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/business-listings", businessListingRoutes)
app.use("/api/uploads", uploadRoutes)
// app.use("/api/service-units", serviceUnitRoutes)
// app.use("/api/classifieds", classifiedRoutes)
// app.use("/api/subscriptions", subscriptionRoutes)
// app.use("/api/business-categories", businessCategoryRoutes)
// app.use("/api/admin-centers", adminCenterRoutes)
// app.use("/api/posts", postRoutes)
// app.use("/api/post-categories", postCategoryRoutes)
// app.use("/api/city-section-promoters", citySectionPromoterRoutes)

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Vasavi Info Center API",
    version: "1.0.0",
    documentation: "/api-docs",
  })
})

// API documentation route
app.get("/api-docs", (req, res) => {
  res.json({
    message: "API Documentation",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me",
      },
      users: {
        getAll: "GET /api/users",
        getById: "GET /api/users/:id",
        update: "PUT /api/users/:id",
        delete: "DELETE /api/users/:id",
      },
      // Add more endpoint documentation here
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection()
    if (!dbConnected) {
      console.error("Failed to connect to database. Server will not start.")
      process.exit(1)
    }

    // Start server if database connection is successful
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Error starting server:", error)
    process.exit(1)
  }
}

startServer()

module.exports = app // For testing purposes
