"use client";
import React, { useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { UserCourseListContext } from "../_context/UserCourseListContext";

function DashBoardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [userCourseList, setUserCourseList] = useState([]);
  
  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div className="flex">
        {/* Background overlay (only visible when sidebar is open) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform bg-white md:w-64 w-64 transition-transform duration-300 md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SideBar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content */}
        <div className="flex-grow">
          {/* Toggle button for smaller screens */}
          <button
            className="p-2 m-4 md:hidden text-gray-800 bg-blue-400 rounded"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Close Menu" : "Menu"}
          </button>

          <div className="md:ml-64">
            <Header />
            <div className="p-10">{children}</div>
          </div>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashBoardLayout;
