"use client";

import Link from "next/link";
import { Briefcase, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-900 dark:text-white">
                JobBoard
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/jobs"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Find Jobs
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Admin
            </Link>
          </nav>
          <div className="flex-1 flex items-center justify-end gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/jobs"
                className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                href="/admin"
                className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button variant="ghost" className="w-full justify-start">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button className="w-full justify-start">
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
