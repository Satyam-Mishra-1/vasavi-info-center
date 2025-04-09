import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Vasavi Information Centre</h3>
            <p className="text-gray-400 mb-4">
              Dolor amet sit justo amet elitr clita ipsum elitr est Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
                <FaFacebook />
              </a>
              <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
                <FaTwitter />
              </a>
              <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
                <FaInstagram />
              </a>
              <a href="#" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p className="text-gray-400 mb-2">Address goes here</p>
            <p className="text-gray-400 mb-2">+91 9246581272</p>
            <p className="text-gray-400 mb-2">+91 9246581272</p>
            <p className="text-gray-400">info@vasaviinformationcentre.org</p>
            <p className="text-gray-400">info@vasaviinformationcentre.org</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/classes" className="text-gray-400 hover:text-white">Classes</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/schedule" className="text-gray-400 hover:text-white">Schedule</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Dolor amet sit justo amet elitr clita ipsum elitr est Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l focus:outline-none"
              />
              <button className="bg-pink-500 text-white px-4 py-2 rounded-r hover:bg-pink-600">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">© Vasavi Information Centre. All right reserved.</p>
            <p className="text-gray-400">Designed By Ignithura Technologies</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;