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
    <div>
      {job ? (
        <>
          <h1>{job.title}</h1>
          <p>
            {job.company} - {job.location}
          </p>
          <p>{job.description}</p>
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};
export default Detailspage;
