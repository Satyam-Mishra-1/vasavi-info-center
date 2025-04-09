import React from 'react';
import family from '../public/family-slide.jpg';

function Teachers() {
  const teachers = [
    {
      id: 1,
      name: 'Emily Ava',
      role: 'Instructor',
      image: '/teacher-image.jpg'
    },
    {
      id: 2,
      name: 'Emily Ava',
      role: 'Instructor',
      image: '/teacher-image.jpg'
    },
    {
      id: 3,
      name: 'Emily Ava',
      role: 'Instructor',
      image: '/teacher-image.jpg'
    },
    {
      id: 4,
      name: 'Emily Ava',
      role: 'Instructor',
      image: '/teacher-image.jpg'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500">వాసవి ఇన్ఫర్మేషన్ సెంటర్ TEACHERS</span>
          <h2 className="text-3xl font-bold mt-2">Our Professional Instructor</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="relative group">
              <img src={family} alt={teacher.name} className="w-full h-96 object-cover rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white p-4 text-center">
                <h3 className="text-xl font-semibold">{teacher.name}</h3>
                <p>{teacher.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teachers;