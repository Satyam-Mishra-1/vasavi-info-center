import React from 'react';

function Classes() {
  const classes = [
    {
      id: 1,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 2,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 3,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 4,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500">OUR వాసవి ఇన్ఫర్మేషన్ సెంటర్ CLASSES</span>
          <h2 className="text-3xl font-bold mt-2">వాసవి ఇన్ఫర్మేషన్ సెంటర్ Classes for everyone</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="/class-image.jpg" alt={classItem.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{classItem.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
                <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
                  Explore Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classes;