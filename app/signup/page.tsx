"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({});

    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      setFieldErrors(validation.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          callbackURL: "/admin",
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            router.push("/");
          },
          onError: (ctx) => {
            console.error("Signup failed:", {
              status: ctx.error.status,
              statusText: ctx.error.statusText,
              message: ctx.error.message,
            });
            setError(ctx.error.message || "Something went wrong!");
            setIsLoading(false);
          },
        },
      );
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Briefcase className="text-white h-8 w-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Join the QuickHire community today
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <form className="space-y-5" onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-700 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-12 rounded-xl transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-xs text-red-500 font-medium mt-1 ml-1">
                      {fieldErrors.name[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-700 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-12 rounded-xl transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-xs text-red-500 font-medium mt-1 ml-1">
                      {fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-700 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-12 rounded-xl transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  {fieldErrors.password && (
                    <p className="text-xs text-red-500 font-medium mt-1 ml-1">
                      {fieldErrors.password[0]}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
                {!isLoading && (
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-6 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
