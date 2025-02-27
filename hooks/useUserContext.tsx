import { UserContext } from "@/context/AppContext";
import { useContext } from "react";

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
