import React, { useState } from 'react';
import carousel from '../public/carousel-1.jpg';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'practice', label: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Practice' },
    { id: 'training', label: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Training' },
    { id: 'growth', label: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Growth' },
    { id: 'improvement', label: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Improvement' }
  ];

  const images = Array(10).fill('/gallery-image.jpg');

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500">వాసవి ఇన్ఫర్మేషన్ సెంటర్ GALLERY</span>
          <h2 className="text-3xl font-bold mt-2">Our వాసవి ఇన్ఫర్మేషన్ సెంటర్ class gallery</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-full ${
                activeFilter === filter.id
                  ? 'bg-pink-500 text-white'
                  : 'border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img src={carousel} alt={`Gallery ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-pink-500 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-3xl">⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;