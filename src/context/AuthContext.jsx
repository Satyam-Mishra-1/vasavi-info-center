// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//       // You could also verify the token with the backend here
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/login', {
//         email,
//         password,
//       });
//       localStorage.setItem('token', response.data.token);
//       setIsAuthenticated(true);
//       setUser(response.data.user);
//     } catch (error) {
//       console.error(error.response); 
//       throw new Error('Login failed');
//     }
//   };

//   const register = async (email, password) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/register', {
//         email,
//         password,
//       });
//       localStorage.setItem('token', response.data.token);
//       setIsAuthenticated(true);
//       setUser(response.data.user);
//     } catch (error) {
//       throw new Error('Registration failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
