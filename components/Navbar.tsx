"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { decodeJWT } from "@/utils/decodeJWT";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type UserType = {
  name?: string;
};

const Navbar = () => {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState<UserType | null>(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  useEffect(() => {
    setDecodedToken(decodeJWT(token));
  }, [token]);

  const Logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    router.push("/login");
  };

  if (!decodedToken) {
    return;
  }

  return (
    <header
      className={`${
        token ? "block" : "hidden"
      } bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-center`}
    >
      <div className="text-white flex justify-between items-center max-w-6xl mx-auto">
        <span className="font-semibold">Welcome, {decodedToken?.name} !</span>
        <div className="profile space-x-4">
          <Link
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            href={"/profile"}
          >
            profile
          </Link>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            onClick={Logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
