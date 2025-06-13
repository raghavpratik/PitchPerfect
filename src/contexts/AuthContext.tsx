"use client";

import type { User } from "@/types";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setUserRole: (role: "founder" | "investor") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Try to load user from localStorage on initial load
    const storedUser = localStorage.getItem("pitchPadUser");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("pitchPadUser", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("pitchPadUser");
  };
  
  const setUserRole = (role: "founder" | "investor") => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("pitchPadUser", JSON.stringify(updatedUser));
    } else {
      // If no user, create a placeholder user with the role for signup flow
      const tempUser = { id: "temp", email: "", role };
      setUser(tempUser);
       // Do not store temp user in local storage until full login
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
