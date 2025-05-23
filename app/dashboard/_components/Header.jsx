import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
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