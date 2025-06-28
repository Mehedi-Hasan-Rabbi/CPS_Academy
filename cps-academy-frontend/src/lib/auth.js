// src/lib/auth.js
"use client"; // This module needs to run on the client-side for cookie management

import Cookies from "js-cookie";
import { fetchAPI } from "./api"; // Our existing fetchAPI utility

// Function to set the JWT and user data in cookies
export const setToken = (data) => {
  if (typeof window !== "undefined") {
    Cookies.set("token", data.jwt);
    Cookies.set("user", JSON.stringify(data.user)); // Store user object as a string
    
    // Optional: Redirect to dashboard or homepage after successful login/registration
    // window.location.replace("/");
  }
};

// Function to remove the JWT and user data from cookies
export const unsetToken = () => {
  if (typeof window !== "undefined") {
    Cookies.remove("token");
    Cookies.remove("user");
    // Optional: Redirect to login page after logout
    // window.location.replace("/login");
  }
};

// Function to register a user
export const registerUser = async (username, email, password) => {
  try {
    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error?.message || "Registration failed");
    }

    const data = await res.json();
    if (data.jwt && data.user) {
      setToken(data);
      return data.user;
    } else {
      throw new Error("Registration failed: Invalid response.");
    }
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (identifier, password) => {
  try {
    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error?.message || "Login failed");
    }

    const data = await res.json();

    if (data.jwt && data.user) {
      setToken(data);
      return data.user; // Return user object on success
    } else {
      throw new Error("Login failed: Invalid response from server.");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Re-throw to be caught by the component
  }
};


// Function to get current user from cookie
export const getUserFromCookie = () => {
  if (typeof window !== "undefined") {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Function to get JWT from cookie
export const getTokenFromCookie = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("token");
  }
  return null;
};