// src/components/LogoutButton.jsx
const LogoutButton = ({ onLogout }) => {
    const logout = () => {
      localStorage.removeItem('token');
      onLogout();
    };
  
    return <button onClick={logout} className="btn-secondary">Logout</button>;
  };
  
  export default LogoutButton;
  