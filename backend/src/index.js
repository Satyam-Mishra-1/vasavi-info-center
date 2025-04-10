// import express from 'express';
// import mysql from 'mysql2/promise';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'your_password',
//   database: 'auth_db'
// });

// // Create users table if it doesn't exist
// const initDB = async () => {
//   try {
//     const connection = await pool.getConnection();
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     connection.release();
//     console.log('Database initialized successfully');
//   } catch (error) {
//     console.error('Error initializing database:', error);
//   }
// };

// initDB();

// // Register endpoint
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     const connection = await pool.getConnection();
//     await connection.query(
//       'INSERT INTO users (email, password) VALUES (?, ?)',
//       [email, hashedPassword]
//     );
    
//     const [rows] = await connection.query(
//       'SELECT id, email FROM users WHERE email = ?',
//       [email]
//     );
//     connection.release();

//     const token = jwt.sign({ userId: rows[0].id }, 'your_jwt_secret', {
//       expiresIn: '24h',
//     });

//     res.status(201).json({
//       token,
//       user: { id: rows[0].id, email: rows[0].email }
//     });
//   } catch (error) {
//     res.status(400).json({ error: 'Registration failed' });
//   }
// });

// // Login endpoint
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const connection = await pool.getConnection();
//     const [rows] = await connection.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );
//     connection.release();

//     if (rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, rows[0].password);
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: rows[0].id }, 'your_jwt_secret', {
//       expiresIn: '24h',
//     });

//     res.json({
//       token,
//       user: { id: rows[0].id, email: rows[0].email }
//     });
//   } catch (error) {
//     res.status(400).json({ error: 'Login failed' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });








import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Hardcoded admin user (password is bcrypt hash of 'Admin@123')
const adminUser = {
  id: 1,
  email: 'admin@gmail.com',
  password: '$2a$10$zK/WUnpGKwRbFzv2ToKZQuBL7uhAoZk9J2fmaZTWoV6JjMRvO2U3y', // hashed 'Admin@123'
  name: 'Admin',
  role: 'Chairman',
  phone: '9999999999',
  location_id: 1,
  profile_image: null,
  created_at: new Date().toISOString()
};

// ✅ Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== adminUser.email) {
      console.log("Wrong Email");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, adminUser.password);
    if (!validPassword) {
       console.log("Wrong Password");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: adminUser.id }, 'your_jwt_secret', {
      expiresIn: '24h'
    });

      

    res.status(200).json({
      token,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        phone: adminUser.phone,
        location_id: adminUser.location_id
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 🛑 Registration endpoint disabled
app.post('/api/auth/register', (req, res) => {
  return res.status(403).json({ error: 'Registration is disabled in demo mode' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
