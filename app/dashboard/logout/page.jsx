'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';  // This is important

function LogOut() {
  const router = useRouter();
  const { signOut } = useClerk();  // Access Clerk instance

  const handleLogout = async () => {
    await signOut();  // Calls sign out
    router.push('/'); // Redirect after logout
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-medium">Log Out</h1>
      <p className="text-gray-600 my-4">Are you sure you want to log out?</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default LogOut;
