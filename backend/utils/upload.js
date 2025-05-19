const { v4: uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")
const multer = require("multer")

// Define upload directory
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname)
    const fileName = `${uuidv4()}${fileExtension}`
    cb(null, fileName)
  },
})

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"]
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed."), false)
  }
}

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

// Function to delete a file
function deleteFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath.replace(/^\//, ""))
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
    }
    return true
  } catch (error) {
    console.error("File deletion error:", error)
    return false
  }
}

// Process uploaded file and return file info
function processUploadedFile(file) {
  // Generate thumbnail path (in a real app, you would create actual thumbnails)
  let thumbnailPath = null
  if (file.mimetype.startsWith("image/")) {
    thumbnailPath = `/uploads/${file.filename}`
  }

  return {
    originalName: file.originalname,
    fileName: file.filename,
    filePath: `/uploads/${file.filename}`,
    thumbnailPath,
    fileSize: file.size,
    fileType: file.mimetype,
  }
}

module.exports = {
  upload,
  deleteFile,
  processUploadedFile,
}
