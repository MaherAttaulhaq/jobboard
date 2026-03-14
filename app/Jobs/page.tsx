"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category?: string;
  description?: string;
  created_at?: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data: Job[] = await response.json();
        setLoading(false);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-6">Job Listings</h1>
        {loading ? (
          // Skeleton loader
          <>
            <div className="animate-pulse bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            </div>
            <div className="animate-pulse bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            </div>
          </>
        ) : (
          jobs?.map((job) => (
            <div
              key={job.id}
              className="bg-green-100 rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-2">Description:</span>
                <p className="text-gray-700">{job.description}</p>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-2">Created_at:</span>
                <p className="text-gray-700">{job.created_at}</p>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-2">Location:</span>
                <p className="text-gray-700">{job.location}</p>
              </div>
              <Link
                href="/Jobs/details"
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                <button>View Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Jobs;
