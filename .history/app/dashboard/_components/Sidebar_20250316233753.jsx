'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHome,  AiOutlineCompass, AiOutlineRocket,AiOutlineFileText, AiOutlineLogout } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import { LuLectern } from "react-icons/lu";
import { useClerk } from '@clerk/clerk-react';
function Sidebar() {

  const { signOut } = useClerk(); // Clerk's signOut method

  const path = usePathname()
  const Menu =[
    {
      id: 1,
      name: 'Home',
      icon: <AiOutlineHome />,
      path: '/dashboard'
    },
    {
      id: 4,
      name: 'My Summaries',
      icon: <AiOutlineFileText />,
      path: '/dashboard/summaries'
  }
  ,
    {
      id: 2,
      name: 'Explore',
      icon: <AiOutlineCompass />,
      path: '/dashboard/explore'
    },

    {
      id: 8,
      name: 'Log Out',
      icon: <AiOutlineLogout />,
      path: '/sign-out'
    }
  ];
  const handleLogout = async () => {
    try {
      await signOut(); // Sign out the user using Clerk
     // console.log('User has logged out');
      // Optionally, redirect to homepage or any other path
      window.location.href = '/'; // Redirect to homepage after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <div className="flex items-center">
            <LuLectern size={48} className="text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">Lectern</span>
        </div>        
      <hr className='py-5'/>
        <ul>
      {Menu.map((item, index) => (
        item.name === 'Log Out' ? (
          <div
            key={index}
            className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3`}
            onClick={handleLogout} // Call handleLogout on click
          >
            <div className='text-2xl'>{item.icon}</div>
            <h2>{item.name}</h2>
          </div>
        ) : (
          <Link href={item.path} key={index}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3
              ${item.path === path ? 'bg-gray-100 text-black' : ''}`}
            >
              <div className='text-2xl'>{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        )
      ))}
    </ul>

        <div className='absolute bottom-10 w-[80%]'>

        </div>
         
    </div>
  )
}

export default Sidebar