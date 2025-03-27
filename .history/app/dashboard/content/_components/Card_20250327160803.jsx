import React from 'react';

const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500',
  'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
  'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const Card = ({ number, index }) => {
  const randomColor = getRandomColor();

  return (
    <div className="relative bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transform transition duration-500 hover:scale-105">
      <div className="absolute top-3 right-3 rounded-full bg-blue-600 text-gray-200 w-6 h-6 text-center">
        {number}
      </div>
      <div className="p-2 flex justify-center">
        <div className={`rounded-md w-full ${randomColor}`} style={{ aspectRatio: '16 / 9' }}></div>
        {/* Placeholder for image - Uncomment this when needed */}
        {/* <a href="#"> */}
        {/*   <img className="rounded-md" src="your-image-url.jpg" loading="lazy" alt="thumbnail" /> */}
        {/* </a> */}
      </div>
      <div className="px-4 pb-3">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight hover:text-blue-800 dark:hover:text-blue-300 text-gray-900 dark:text-white">
            Topic {index + 1}
          </h5>
        </a>
        <p className="antialiased text-gray-600 dark:text-gray-400 text-sm break-all">
          Describe this topic
        </p>
      </div>
    </div>
  );
};

export default Card;
