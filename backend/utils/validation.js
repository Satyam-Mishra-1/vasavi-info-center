// Validation helper functions

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Validate phone number format
  function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/
    return phoneRegex.test(phone)
  }
  
  // Validate password strength
  function isStrongPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  }
  
  // Validate required fields
  function validateRequired(data, fields) {
    const missingFields = fields.filter((field) => !data[field])
    return missingFields
  }
  
  // Validate user input
  function validateUser(data, isUpdate = false) {
    const errors = []
  
    // For updates, we only validate fields that are provided
    if (!isUpdate) {
      const requiredFields = ["name", "role", "phone", "password"]
      const missing = validateRequired(data, requiredFields)
      if (missing.length > 0) {
        errors.push(`Missing required fields: ${missing.join(", ")}`)
      }
    }
  
    if (data.email && !isValidEmail(data.email)) {
      errors.push("Invalid email format")
    }
  
    if (data.phone && !isValidPhone(data.phone)) {
      errors.push("Invalid phone number format")
    }
  
    if (data.password && !isStrongPassword(data.password)) {
      errors.push(
        "Password must be at least 8 characters with at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      )
    }
  
    if (data.role && !["Chairman", "Coordinator", "Promoter", "Member"].includes(data.role)) {
      errors.push("Invalid role")
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  // Validate location input
  function validateLocation(data) {
    const errors = []
  
    const requiredFields = ["name", "type"]
    const missing = validateRequired(data, requiredFields)
    if (missing.length > 0) {
      errors.push(`Missing required fields: ${missing.join(", ")}`)
    }
  
    if (data.type && !["Country", "State", "District", "City"].includes(data.type)) {
      errors.push("Invalid location type")
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  // Validate section input
  function validateSection(data) {
    const errors = []
  
    if (!data.name) {
      errors.push("Section name is required")
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  // Validate event input
  function validateEvent(data) {
    const errors = []
  
    const requiredFields = ["title", "event_date"]
    const missing = validateRequired(data, requiredFields)
    if (missing.length > 0) {
      errors.push(`Missing required fields: ${missing.join(", ")}`)
    }
  
    if (data.event_date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(data.event_date)) {
        errors.push("Invalid date format. Use YYYY-MM-DD")
      }
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  // Validate business listing input
  function validateBusinessListing(data) {
    const errors = []
  
    if (!data.business_name) {
      errors.push("Business name is required")
    }
  
    if (data.email && !isValidEmail(data.email)) {
      errors.push("Invalid email format")
    }
  
    if (data.phone && !isValidPhone(data.phone)) {
      errors.push("Invalid phone number format")
    }
  
    if (data.website) {
      try {
        new URL(data.website)
      } catch (e) {
        errors.push("Invalid website URL")
      }
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  // Validate classified input
  function validateClassified(data) {
    const errors = []
  
    const requiredFields = ["title", "type"]
    const missing = validateRequired(data, requiredFields)
    if (missing.length > 0) {
      errors.push(`Missing required fields: ${missing.join(", ")}`)
    }
  
    if (data.type && !["Job", "Business"].includes(data.type)) {
      errors.push("Invalid classified type")
    }
  
    if (data.contact_email && !isValidEmail(data.contact_email)) {
      errors.push("Invalid contact email format")
    }
  
    if (data.contact_phone && !isValidPhone(data.contact_phone)) {
      errors.push("Invalid contact phone format")
    }
  
    return {
      valid: errors.length === 0,
      errors,
    }
  }
  
  module.exports = {
    isValidEmail,
    isValidPhone,
    isStrongPassword,
    validateRequired,
    validateUser,
    validateLocation,
    validateSection,
    validateEvent,
    validateBusinessListing,
    validateClassified,
  }
  