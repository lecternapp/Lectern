import React from 'react';
import Card from './_components/Card';
import Link from 'next/link';
import { AiOutlineFileText } from "react-icons/ai";
import { IconClick } from '@tabler/icons-react';

const cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ExplorePage = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <header className="text-left">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white inline-flex items-center p-4 gap-2">
            Explore recently created content <IconClick />
        </h1>
      </header>

      <Link href="/topic">
        <span className="text-blue-500 hover:underline cursor-pointer p-4">
          Go to Topic
        </span>
      </Link>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4">
        {numbers.map((num, index) => (
          <Card key={index} number={num} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
