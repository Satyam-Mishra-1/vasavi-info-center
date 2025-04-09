const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [userData.name, userData.email, userData.password], callback);
  },
};

module.exports = User;