// src/app/components/Navbar.jsx
"use client"; // This is a Client Component

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../auth-context'; // Import our client-side hook

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  // Don't render until authentication state is loaded
  if (loading) {
    return (
      <nav className="bg-blue-700 p-4 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold">CPS Academy</span>
          <span>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-700 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          CPS Academy
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">Welcome, {user.username}!</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/login" className="hover:text-blue-200 transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-200 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}