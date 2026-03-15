"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setFieldErrors({});

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      setFieldErrors(validation.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        callbackURL: "/admin", // Redirect here after successful login
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Invalid email or password.");
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full">
          {/* Branding/Logo area */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Briefcase className="text-white h-8 w-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Log in to your QuickHire account
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                      placeholder="jane@example.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-xs text-red-500 font-medium mt-1 ml-1">
                      {fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold text-blue-700">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
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

              <div className="flex items-center space-x-2 ml-1">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm font-medium text-blue-700 cursor-pointer select-none">
                  Remember me
                </label>
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
                {isLoading ? "Logging in..." : "Log In"}
                {!isLoading && (
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-6 font-medium">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
