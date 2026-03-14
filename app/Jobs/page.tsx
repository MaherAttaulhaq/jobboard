"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  const jobsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
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
    <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Job Listings</h1>

        </div>

        {loading ? (
          // Skeleton loader
          <>
            <div className="animate-pulse bg-gray-50 rounded-lg shadow-md p-5 mb-4">
              <div className="h-5 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-md w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
            </div>
            <div className="animate-pulse bg-gray-50 rounded-lg shadow-md p-5 mb-4">
              <div className="h-5 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-md w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
            </div>
          </>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs?.map((job) => (
                <div
                  key={job.id}
                  className="bg-gray-200 rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {job.title}
                  </h2>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-700 mr-2 font-semibold">
                      Description:
                    </span>
                    <p className="text-gray-800">{job.description}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-700 mr-2 font-semibold">
                      Created At:
                    </span>
                    <p className="text-gray-800">{job.created_at}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-700 mr-2 font-semibold">
                      Location:
                    </span>
                    <p className="text-gray-800">{job.location}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-700 mr-2 font-semibold">
                      Company:
                    </span>
                    <p className="text-gray-800">{job.company}</p>
                  </div>
                  <Link href="/Jobs/details" >
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4">View Details</button>
                  </Link>
                </div>
              ))}
            </div>
       
        )}
      </div>
      <Footer />
    </>

  );
};

export default Jobs;
