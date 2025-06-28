// src/app/components/Navbar.jsx
"use client"; // This is a Client Component

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../auth-context'; // Import our client-side hook
import { FaGraduationCap, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  // Calculate navbar height for spacer
  const navbarHeight = navbarRef.current?.offsetHeight || 0;

  // Don't render until authentication state is loaded
  if (loading) {
    return (
      <>
        <nav 
          ref={navbarRef}
          className={`fixed w-full z-50 p-4 text-white shadow-lg transition-all duration-300 ${scrolled ? 'bg-blue-800 py-3' : 'bg-blue-700'}`}
        >
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaGraduationCap className="text-2xl" />
              <span className="text-xl font-bold">CPS Academy</span>
            </div>
            <span className="animate-pulse">Loading...</span>
          </div>
        </nav>
        {/* Spacer to push content down */}
        <div style={{ height: navbarRef.current?.offsetHeight || '4rem' }} />
      </>
    );
  }

  return (
    <>
      <nav 
        ref={navbarRef}
        className={`fixed w-full z-50 text-white shadow-lg transition-all duration-300 ${scrolled ? 'bg-blue-800' : 'bg-blue-700'}`}
      >
        <div className="p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              onClick={() => setIsOpen(false)}
            >
              <FaGraduationCap className="text-2xl group-hover:text-blue-200 transition-colors" />
              <span className="text-xl font-bold group-hover:text-blue-200 transition-colors">CPS Academy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-blue-200" />
                    <span className="text-lg font-medium">Welcome, {user.username}!</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link 
                    href="/login" 
                    className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-blue-800 rounded-b-lg shadow-xl">
            <div className="container mx-auto py-4 px-6">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-700 rounded-lg">
                    <FaUser className="text-xl" />
                    <span className="text-lg font-medium">Welcome, {user.username}!</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link 
                    href="/login" 
                    className="flex items-center space-x-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserPlus />
                    <span>Create Account</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to push content down */}
      <div style={{ height: navbarHeight || '4rem' }} />
    </>
  );
}