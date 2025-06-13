
"use client";

import type { User } from "@/types";
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";

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

  const login = useCallback((userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("pitchPadUser", JSON.stringify(userData));
  }, [setIsLoggedIn, setUser]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("pitchPadUser");
  }, [setIsLoggedIn, setUser]);
  
  const setUserRole = useCallback((role: "founder" | "investor") => {
    if (user) {
      // Only update if the role is actually different
      if (user.role !== role) {
        const updatedUser = { ...user, role };
        setUser(updatedUser);
        localStorage.setItem("pitchPadUser", JSON.stringify(updatedUser));
      }
    } else {
      // If no user, create a placeholder user with the role for signup flow
      const tempUser = { id: "temp", email: "", role };
      setUser(tempUser);
       // Do not store temp user in local storage until full login
    }
  }, [user, setUser]);

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

