const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ name, email, password: hashedPassword }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error.' });
      }
      res.status(201).json({ message: 'User registered successfully.' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};