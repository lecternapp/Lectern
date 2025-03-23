import React from 'react';
import Card from './_components/Card';
import { AiOutlineFileText } from "react-icons/ai";

const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ContentPage = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <header className="text-left">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white inline-flex items-center p-4 gap-2">
            My Content <AiOutlineFileText />
        </h1>
      </header>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4">
        {numbers.map((num, index) => (
          <Card key={index} number={num} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
