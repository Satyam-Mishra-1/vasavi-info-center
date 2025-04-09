import React from 'react';

function Events() {
  const events = [
    {
      id: 1,
      date: 'JAN 20',
      time: '08:00AM - 10:00PM',
      location: 'New York',
      title: 'Open House - Springs వాసవి ఇన్ఫర్మేషన్ సెంటర్',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 2,
      date: 'JUN 30',
      time: '08:00AM - 10:00PM',
      location: 'New York',
      title: 'Open House And Registration',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 3,
      date: 'MAY 15',
      time: '08:00AM - 10:00PM',
      location: 'New York',
      title: 'Open House Morris వాసవి ఇన్ఫర్మేషన్ సెంటర్',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 4,
      date: 'APR 2',
      time: '08:00AM - 10:00PM',
      location: 'New York',
      title: 'Open House వాసవి ఇన్ఫర్మేషన్ సెంటర్ Studio',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-orange-500">EVENTS</span>
            <h2 className="text-3xl font-bold mt-2">Upcoming Events</h2>
          </div>
          <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600">
            View All Events
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src="/event-image.jpg" alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded">
                  {event.date}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{event.time}</span>
                  <span className="mx-2">•</span>
                  <span>{event.location}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
                <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;