"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock,
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

const SignUpPage = () => {
  const router = useRouter();
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", data);

      if (res?.data) {
        localStorage.setItem("access_token", res.data.access_token);
        router.push("/"); // Redirect after login
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
      <MotionAnimation>
        <Card className="max-w-3xl shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Create an Account
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
                    placeholder="Username"
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <User className="text-gray-500" />
                  <Input
                    className="border-none w-full placeholder:text-base"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <Mail className="text-gray-500" />
                  <Input
                    className="border-none w-full placeholder:text-base"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <Lock className="text-gray-500" />
                  <Input
                    className="border-none w-full placeholder:text-base"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <Calendar className="text-gray-500" />
                  <Input
                    className="border-none w-full text-gray-500  text-base placeholder:text-base"
                    type="date"
                    name="birthdate"
                    placeholder="Birth Date"
                  />
                </div>
                <div className="flex gap-2 items-center border p-2 rounded">
                  <PersonStanding className="text-gray-500" />
                  <select
                    className="w-full p-2 rounded-md bg-white text-gray-500 focus-visible:outline outline-black outline-1"
                    name="gender"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="flex gap-3 items-center border p-2 rounded sm:col-span-2">
                  <FileText className="text-gray-500" />
                  <textarea
                    className="w-full border-none rounded-md border border-gray-300 text-gray-500 p-2 placeholder:text-gray-500 focus-visible:outline outline-black outline-1 placeholder:text-base"
                    placeholder="Description"
                    rows={1}
                    name="description"
                  ></textarea>
                </div>
                <Button
                  className="w-full sm:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  type="submit"
                >
                  Sign Up
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

export default SignUpPage;
