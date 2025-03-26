import Sidebar from './_components/Sidebar'
import React from 'react'
import Header from './_components/Header'''
export default function DashboardLayout({ children }) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">{children}</main>
        </div>
      </div>
    );
  }
  