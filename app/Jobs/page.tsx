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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>
            {job.company} - {job.location}
          </p>
          {/* Add more job details here */}
        </div>
      ))}
    </div>
  );
};

export default Jobs;
