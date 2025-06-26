// src/app/auth-context.js
"use client"; // This is a Client Component

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserFromCookie, unsetToken } from "../lib/auth"; // Our auth utilities
import { useRouter } from "next/navigation";

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Stores the user object
  const [loading, setLoading] = useState(true); // To indicate initial loading state
  const router = useRouter();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = getUserFromCookie();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error parsing user from cookie:", error);
        unsetToken(); // Clear corrupted token/user
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []); // Run once on mount

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    unsetToken();
    setUser(null);
    router.push("/login"); // Redirect to login page
  };

  // The value provided to consumers
  const authContextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    login, // This method is not directly used by components usually, but by setToken in lib/auth.js
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}