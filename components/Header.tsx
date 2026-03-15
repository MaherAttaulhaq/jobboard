import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100"
      data-purpose="site-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <Link href="/">
              <span className="text-2xl font-bold tracking-tight text-blue-900">
                QuickHire
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              className="text-slate-600 hover:text-primary font-medium"
              href="/jobs"
            >
              Find Jobs
            </Link>
            <Link
              className="text-slate-600 hover:text-primary font-medium"
              href="/admin"
            >
              Admin
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              className="text-primary font-semibold px-4 py-2"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
