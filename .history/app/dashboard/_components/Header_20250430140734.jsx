import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Lectern } from 'lucide-react'
function Header() {
  return (
    //Can add search bar here
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Link  className='cursor-pointer' href={'/dashboard'}></Link>
        <UserButton appearance={{ elements: { userButtonAvatarBox: { width: '48px', height: '48px' } } }} />
    </div>
  )
}

export default Header