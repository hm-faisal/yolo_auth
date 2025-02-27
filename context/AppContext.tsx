"use client";

import { decodeJWT } from "@/utils/decodeJWT";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface AppContextType {
  id: string;
  username: string;
  name: string;
  birthdate: string;
  gender: string;
  email: string;
}

// Create the context with a default value
export const UserContext = createContext<AppContextType | null>(null);

// Define provider props
interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppContextType | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  useEffect(() => {
    setUser(decodeJWT(token));
  }, [token]);

  // Load userId from localStorage on client-side

  const value = { ...user, setToken };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AppProvider;
