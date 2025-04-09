import React from 'react';
import temple from '../public/temple-slide.jpg';

function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Person name',
      profession: 'Profession',
      rating: 4,
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati eiusmod tempor incididunt.'
    },
    {
      id: 2,
      name: 'Person name',
      profession: 'Profession',
      rating: 5,
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati eiusmod tempor incididunt.'
    },
    {
      id: 3,
      name: 'Person name',
      profession: 'Profession',
      rating: 4,
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati eiusmod tempor incididunt.'
    }
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500">OUR CLIENTS REVIEWS</span>
          <h2 className="text-3xl font-bold mt-2">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                <img src={temple} alt={review.name} className="w-20 h-20 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-center">{review.name}</h3>
              <p className="text-gray-500 text-center mb-4">{review.profession}</p>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-2xl ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-center">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;