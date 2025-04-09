import React from 'react';
import gandhi from '../public/temple-slide.jpg';

function Blog() {
  const blogs = [
    {
      id: 1,
      date: '28 August 2021',
      comments: 3,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 2,
      date: '28 August 2021',
      comments: 3,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    },
    {
      id: 3,
      date: '28 August 2021',
      comments: 3,
      title: 'Classical వాసవి ఇన్ఫర్మేషన్ సెంటర్ class',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vero excepturi blanditiis quidem'
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500">BLOG & NEWS</span>
          <h2 className="text-3xl font-bold mt-2">Our Latest News & Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={gandhi} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{blog.date}</span>
                  <span>{blog.comments} Comments</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
                <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;