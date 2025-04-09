import React from 'react';

function Training() {
  const trainings = [
    {
      id: 1,
      number: '02',
      title: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Training'
    },
    {
      id: 2,
      number: '03',
      title: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Training'
    },
    {
      id: 3,
      number: '04',
      title: 'వాసవి ఇన్ఫర్మేషన్ సెంటర్ Training'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-orange-500">వాసవి ఇన్ఫర్మేషన్ సెంటర్ TRAINING</span>
            <h2 className="text-3xl font-bold mt-2">Our Training Platform</h2>
          </div>
          <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600">
            View All Training
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainings.map((training) => (
            <div key={training.id} className="relative">
              <img src="/training-image.jpg" alt={training.title} className="w-full h-64 object-cover rounded-lg" />
              <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded">
                {training.number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Training;