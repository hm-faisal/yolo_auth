"use client";

import { UserContext } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type UserType = {
  id?: string; // Allow undefined
  username?: string;
  name?: string;
  birthdate?: string;
  gender?: string;
  email?: string;
  description?: string;
};

const Page = () => {
  const router = useRouter();
  const userData = useContext(UserContext);
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get(
        `https://auth-nest-kmoz.onrender.com/users/profile/${userData?.id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setUser(res.data));
  }, [userData]);
  return (
    <div className="flex items-center justify-center min-h-[90vh] p-6">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        {user ? (
          <div className="space-y-4">
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Birth Date:</strong> {user?.birthdate}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {user?.description ? user?.description : "No Description found"}
            </p>
            <div className="">
              <Link
                href={"/update"}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                Update Your Profile
              </Link>
            </div>
          </div>
        ) : (
          "No User Data Found"
        )}
      </div>
    </div>
  );
};

export default Page;
