'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LuLectern } from "react-icons/lu";
import Link from 'next/link';

function Header() {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between bg-secondary shadow-sm p-4">
      {/* Logo on the Left */}
      <div className="flex items-center">
        <LuLectern size={48} className="text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">Lectern</span>
      </div>

      {/* Navigation Links in the Center */}
      <ul className="flex gap-6 mx-auto text-xl">
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
  );
}

export default Header;
