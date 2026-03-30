"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if you have one
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-4">
          Something went wrong!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          An unexpected error occurred while processing your request. We've
          logged the details and are looking into it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => reset()}
            className="px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Try again
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-4 rounded-lg font-bold border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
            >
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
