"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Calendar,
  FileText,
  Mail,
  UserCheck,
  PersonStanding,
} from "lucide-react";
import MotionAnimation from "../../components/MotionAnimation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/utils/decodeJWT";

type UserType = {
  id?: string;
  username?: string;
  name?: string;
  birthdate?: string;
  gender?: string;
  email?: string;
  description?: string;
};

const UpdateProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    if (!token) return;
    const user = decodeJWT(token);
    setUserData(user);
  }, [token]);

  useEffect(() => {
    if (!userData) return;
    if (!token) return;

    axios
      .get(
        `https://auth-nest-kmoz.onrender.com/users/profile/${userData?.id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setUser(res.data));
  }, [userData]);

  const handleFormData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    axios
      .put(
        `https://auth-nest-kmoz.onrender.com/users/profile/${userData?.id}`,
        { ...data },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res?.data) {
          router.push("/profile");
        }
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <MotionAnimation>
        <Card className="max-w-3xl shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Update Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormData}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                <div className="flex gap-2 items-center border p-2 rounded">
                  <UserCheck className="text-gray-500" />
                  <Input
                    className="border-none w-full placeholder:text-base"
                    type="text"
                    name="username"
                    defaultValue={user?.username}
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <User className="text-gray-500" />
                  <Input
                    className="border-none w-full placeholder:text-base"
                    type="text"
                    name="name"
                    defaultValue={user?.name}
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <Mail className="text-gray-500" />
                  <Input
                    className="border-none w-full placeholder:text-base"
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                  />
                </div>

                <div className="flex gap-2 items-center border p-2 rounded">
                  <Calendar className="text-gray-500" />
                  <Input
                    className="border-none w-full text-gray-500  text-base placeholder:text-base"
                    type="date"
                    name="birthdate"
                    defaultValue={user?.birthdate}
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <PersonStanding className="text-gray-500" />
                  <select
                    className="w-full p-2 rounded-md bg-white text-gray-500 focus-visible:outline outline-black outline-1"
                    name="gender"
                    defaultValue={user?.gender}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="flex gap-3 items-center border p-2 rounded">
                  <FileText className="text-gray-500" />
                  <textarea
                    className="w-full border-none rounded-md border border-gray-300 text-gray-500 p-2 placeholder:text-gray-500 focus-visible:outline outline-black outline-1 placeholder:text-base"
                    rows={1}
                    name="description"
                    defaultValue={user?.description}
                  ></textarea>
                </div>
                <Button
                  className="w-full sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  type="submit"
                >
                  Update Information
                </Button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-indigo-500 hover:underline">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </MotionAnimation>
    </div>
  );
};

export default UpdateProfilePage;
