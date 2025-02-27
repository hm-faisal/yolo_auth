"use client";

import { decodeJWT } from "@/utils/decodeJWT";
import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the context type
type AppContextType = {
  id?: string; // Allow undefined
  username?: string;
  name?: string;
  birthdate?: string;
  gender?: string;
  email?: string;
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

// Create the context with a default value
export const UserContext = createContext<AppContextType | null>(null);

// Define provider props
interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppContextType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUser(decodeJWT(token));
  }, [token]);

  // Load userId from localStorage on client-side

  const value = { ...user, setToken };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AppProvider;
