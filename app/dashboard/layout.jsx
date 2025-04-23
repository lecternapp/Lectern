import Sidebar from "./_components/Sidebar";
import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
