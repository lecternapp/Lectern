'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LuLectern } from "react-icons/lu";
import Link from 'next/link';

function Navbar() {
  const path = usePathname();

  return (
    <div className="w-full bg-secondary shadow-sm">
      <div className="max-w-7xl mx-auto px-4 relative flex flex-col md:flex-row items-center p-4">
        {/* Logo on the Left */}
        <div className="flex items-center mb-4 md:mb-0 md:absolute md:left-4">
          <LuLectern size={48} className="text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">Lectern</span>
        </div>

        {/* Navigation Links in the Center */}
        <ul className="flex flex-col md:flex-row gap-6 text-xl md:mx-auto">
          <li>
            <Link
              href="/dashboard"
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === '/dashboard' && 'text-primary font-bold'
              }`}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/upgrade"
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === '/dashboard/upgrade' && 'text-primary font-bold'
              }`}
            >
              Upgrade
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/how"
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === '/dashboard/how' && 'text-primary font-bold'
              }`}
            >
              How it Works
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
