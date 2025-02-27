"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MotionAnimation from "@/components/MotionAnimation";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "@/hooks/useUserContext";

const LoginPage = () => {
  const router = useRouter();
  const { setToken } = useUserContext();
  const handleFormData = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    axios
      .post("https://auth-nest-kmoz.onrender.com/auth/login", data)
      .then((res) => {
        if (res?.data) {
          localStorage.setItem("access_token", res.data.access_token);
          setToken(res.data.access_token);
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
      <MotionAnimation>
        <Card className="w-96 shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormData}>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-10"
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-10"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  Login
                </Button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-indigo-500 hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </MotionAnimation>
    </div>
  );
};

export default LoginPage;
