import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/training" element={<Training />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;