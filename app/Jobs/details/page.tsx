"use client";
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

const Detailspage = () => {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    // Fetch job details from the API based on the job ID
    const fetchJob = async () => {
      try {
        // Assuming you have a job ID, replace '1' with the actual job ID
        const response = await fetch("/api/jobs/1");
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data: Job = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, []);
  return (
    <div className="container mx-auto py-8">
      {job ? (
        <div className="bg-gray-100 shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {job.title}
          </h1>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 mr-2">Company:</span>
            <p className="text-gray-800">{job.company}</p>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 mr-2">Location:</span>
            <p className="text-gray-800">{job.location}</p>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 mr-2">Created At:</span>
            <p className="text-gray-800">{job.created_at}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Job Description:
            </h2>
            <p className="text-gray-800">{job.description}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading job details...</p>
      )}
    </div>
  );
};
export default Detailspage;
