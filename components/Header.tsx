"use client";

import Link from "next/link";
import { Briefcase, Menu, X, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  // Define a type for the user object based on your auth-schema.ts
  interface BetterAuthUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    // Add other properties from your user schema if needed
  }
  const user: BetterAuthUser | null = session?.user as BetterAuthUser | null;
  const isLoggedIn = !!session;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // Redirect after successful sign-out
        },
      },
    });
  };

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
            {isLoggedIn && user ? (
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || ""}
                      />
                      <AvatarFallback>
                        {user.name?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
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
              {isLoggedIn && (
                <Link
                  href="/admin"
                  className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </nav>
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              {isLoggedIn && user ? (
                <>
                  <div className="flex items-center gap-3 px-1 py-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || ""}
                      />
                      <AvatarFallback>
                        {user.name?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full"
                  >
                    <div className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md">
                      Log in
                    </div>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full justify-start">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
