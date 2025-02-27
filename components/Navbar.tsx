"use client";

import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { decodeJWT } from "@/utils/decodeJWT";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar: React.FC<ReactElement> = () => {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setDecodedToken(decodeJWT(token));
  }, []);

  const Logout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-center">
      {decodedToken ? (
        <div className="text-white flex justify-between items-center">
          <span className="font-semibold">Welcome, {decodedToken.name} !</span>
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
      ) : (
        <>
          <Link
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            href={"/login"}
          >
            Login
          </Link>
          <Link
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            href={"/signup"}
          >
            Sign Up
          </Link>
        </>
      )}
    </header>
  );
};
export default Navbar;
