"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
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
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsResponse = await fetch(`/api/jobs`);
        if (!jobsResponse.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData: Job[] = await jobsResponse.json();

        let categoriesData: string[] = [];
        try {
          const categoriesResponse = await fetch("/api/categories");
          if (categoriesResponse.ok) {
            categoriesData = await categoriesResponse.json();
          }
        } catch (catError) {
          console.warn("Categories API unavailable");
        }

        const derivedCategories = Array.from(new Set(jobsData.map(j => j.category).filter(Boolean))) as string[];
        setCategories(categoriesData.length > 0 ? categoriesData : derivedCategories);
        setJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const categoryLower = categoryFilter.toLowerCase();
    const locationLower = locationFilter.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower);

    const matchesCategory =
      categoryFilter === "" ||
      (job.category && job.category.toLowerCase().includes(categoryLower));

    const matchesLocation =
      locationFilter === "" ||
      job.location.toLowerCase().includes(locationLower);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  return (
    <>
     <div className="bg-gray-100 min-h-screen"> <Header /><div className="container mx-auto py-8 px-4"><div className="flex justify-between items-center mb-8"><h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <Input
            type="text"
            placeholder="Search jobs by title or company..."
            className="w-full md:w-2/5 text-gray-900 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative w-full md:w-1/4">
            <select
              className="w-full text-gray-900 bg-gray-50 border-gray-200 border rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-colors"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <Input
            type="text"
            placeholder="Filter by location..."
            className="w-full md:w-auto flex-1 text-gray-900 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs?.map((job) => (
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
                <Link href={`/Jobs/${job.id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full mt-4">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
            {filteredJobs.length === 0 && !loading && (
              <div className="text-gray-900 text-center py-4 col-span-full">
                <p>No jobs match your criteria.</p>
              </div>
            )}
          </div>
        )}
         {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 ${
                    currentPage === page ? "bg-blue-500" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer /> 
    </div>
    </>
  );
};

export default Jobs;
