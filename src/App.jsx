import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Events from './components/Events';
import Classes from './components/Classes';
import Training from './components/Training';
import Blog from './components/Blog';
import Teachers from './components/Teachers';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import RegisterForm from './auth/RegisterForm';
import Login from './auth/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './auth/Register';
import Dashboard from './auth/Dashboard';
import Filter from './components/Filter';

// ✅ PrivateRoute uses useAuth properly, as it's rendered *within* AuthProvider
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// ✅ AppRoutes is rendered *within* AuthProvider
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
     
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/training" element={<Training />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mandalchart" element={<Filter />} /> 
      
    

           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<RegisterForm />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
