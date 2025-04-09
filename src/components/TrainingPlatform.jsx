import React from 'react';
import { useState } from 'react';
import gandhi from '../public/gandhi-slide.jpg';

const TrainingPlatform = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const trainingData = [
    {
      id: "01",
      title: "Vedic Mathematics",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem",
      image: gandhi
    },
    {
      id: "02",
      title: "Personalized Learning",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem",
      image: gandhi
    },
    {
      id: "03",
      title: "Convenient Dancing",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem",
      image: gandhi
    },
    {
      id: "04",
      title: "వాసవి ఇన్స్పిరేషన్ సెంటర్ Theater",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem",
      image: gandhi
    },
    {
      id: "05",
      title: "Music Classes",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem",
      image: gandhi
    },
    {
      id: "06",
      title: "Yoga & Meditation",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem",
      image: gandhi
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trainingData.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trainingData.length) % trainingData.length);
  };
  
  // Get visible slides (current and next two)
  const getVisibleSlides = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % trainingData.length;
      visible.push(trainingData[index]);
    }
    return visible;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h6 className="text-orange-500 font-medium">వాసవి ఇన్స్పిరేషన్ సెంటర్ TRAINING</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Training Platform</h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full">
              View All Training
            </button>
          </div>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/3 -left-5 z-10 -translate-y-1/2 md:-translate-x-0">
            <button 
              onClick={prevSlide}
              className="bg-yellow-500 hover:bg-yellow-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleSlides().map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-pink-500 text-white px-4 py-2 text-xl font-bold">
                    {item.id}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute top-1/3 -right-5 z-10 -translate-y-1/2 md:translate-x-0">
            <button 
              onClick={nextSlide}
              className="bg-yellow-500 hover:bg-yellow-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingPlatform;