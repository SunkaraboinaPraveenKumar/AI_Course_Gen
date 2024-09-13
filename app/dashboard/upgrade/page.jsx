"use client"
import React, { useContext } from 'react';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function Upgrade() {
  const { setUserCourseList } = useContext(UserCourseListContext);

  const handleUpgrade = () => {
    // Reset user course list to 0
    setUserCourseList([]);
    alert("Course limit reset. Upgrade for unlimited course creation!");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-medium">Upgrade Your Plan</h1>
      <p className="text-gray-600 my-4">You are currently on the free plan, limited to creating 10 courses.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleUpgrade}
      >
        Reset Course List
      </button>
      <p className="text-gray-500 mt-4">Upgrade to enjoy unlimited course creation and other premium features.</p>
    </div>
  );
}

export default Upgrade;
