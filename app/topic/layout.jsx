import React from 'react';
import Sidebar from './_components/TopicSidebar';
import { IconClipboard, IconExternalLink, IconDots } from '@tabler/icons-react';

function TopicLayout({ children }) {
  return (
    <div>
      <div className='md:w-64 hidden md:block'>
        <Sidebar />
      </div>
      <div className='md:ml-64'>
        <header className="border-b flex items-center justify-between p-8 bg-white ">
          <h1 className="text-2xl font-semibold">Geology Chapter 1: Introduction</h1>
          
          <div className="flex space-x-2">
            <button className="w-10 h-10 border flex items-center justify-center rounded-lg bg-white shadow hover:bg-gray-200">
              <IconClipboard />
            </button>
            <button className="w-10 h-10 border flex items-center justify-center rounded-lg bg-white shadow hover:bg-gray-200">
              <IconExternalLink />
            </button>
            <button className="w-10 h-10 border flex items-center justify-center rounded-lg bg-white shadow hover:bg-gray-200">
              <IconDots />
            </button>
          </div>
        </header>

        <div className=''>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TopicLayout;
