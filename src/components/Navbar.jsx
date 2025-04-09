import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import RegisterForm from '../auth/RegisterForm';
import { useState } from 'react';

function Navbar() {
  const [showForm, setShowForm] = useState(false);
  return (
    <header>
      <div className="bg-yellow-600 text-white py-2">

        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <Link to="/find-location" className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Find A Location
            </Link>
            <span className="flex items-center">
              <FaPhone className="mr-2" />
              +91 9245661272
            </span>
            <span className="flex items-center">
              <FaEnvelope className="mr-2" />
              vasaviinc@gmail.com
            </span>
          </div>
          <div className="flex space-x-4">
            <Link to="/facebook"><FaFacebookF /></Link>
            <Link to="/twitter"><FaTwitter /></Link>
            <Link to="/instagram"><FaInstagram /></Link>
            <Link to="/linkedin"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>


      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="flex items-center">
              <div className="bg-pink-500 p-2 rounded">
                <span className="text-white font-bold">VASAVI</span>
                <div className="text-white text-xs">INFORMATION CENTER</div>
              </div>
              <span className="text-2xl font-bold text-pink-500 ml-2">Information Center</span>
            </Link>

            <div className="flex space-x-6">
              <Link to="/" className="hover:text-pink-500">Home</Link>
              <Link to="/information" className="hover:text-pink-500">Information</Link>
              <Link to="/events" className="hover:text-pink-500">Events</Link>
              <Link to="/mandalchart" className="hover:text-pink-500">MandalChart</Link>
              <div className="relative group">
                <Link to="/services" className="hover:text-pink-500 flex items-center">
                  Other Services <span className="ml-1">▼</span>
                </Link>
              </div>
              <Link to="/contact" className="hover:text-pink-500">Contact Us</Link>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600" onClick={() => setShowForm(true)} >
                Register Now
              </button>
        
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;