"use client";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialLocation = searchParams.get("location") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState(initialLocation);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobsResponse = await fetch(`/api/jobs`);
        if (!jobsResponse.ok) {
          throw new Error(
            `Failed to fetch jobs. Status: ${jobsResponse.status}`,
          );
        }
        const jobsData: Job[] = await jobsResponse.json();
        if (!Array.isArray(jobsData)) {
          throw new Error("Received invalid data from server");
        }

        // Derive categories from the jobs data
        const derivedCategories = Array.from(
          new Set(jobsData.map((j) => j.category).filter(Boolean)),
        ) as string[];
        setCategories(derivedCategories);

        setJobs(jobsData);
      } catch (error: any) {
        console.error("Error fetching jobs:", error);
        setError(
          error.message || "An unexpected error occurred while fetching jobs.",
        );
      } finally {
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
      <div className="bg-gray-50 min-h-screen font-sans">
        <Header />
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our curated list of opportunities and find the
              perfect match for your skills and career goals.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-10 bg-white p-2 rounded-2xl shadow-sm border border-gray-200 md:flex md:items-center md:space-x-2 max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-grow mb-2 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Job title or company..."
                className="w-full pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-gray-900 placeholder-gray-500 h-12 shadow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            {/* Location Input */}
            <div className="relative flex-grow md:flex-shrink-0 md:w-1/4 mb-2 md:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Location..."
                className="w-full pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-gray-900 placeholder-gray-500 h-12 shadow-none"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            {/* Category Select */}
            <div className="relative md:w-1/4">
              <select
                className="w-full bg-transparent text-gray-700 font-medium h-12 pl-3 pr-8 focus:outline-none cursor-pointer appearance-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Any Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-red-200">
              <h3 className="text-xl font-bold text-red-600">
                Oops! Something went wrong.
              </h3>
              <p className="mt-2 text-gray-600">
                We couldn't load the job listings.
              </p>
              <p className="mt-4 text-sm text-gray-500 bg-gray-100 inline-block px-3 py-1 rounded">
                Error: {error}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                This might be an issue with our API. Please try again later. If
                the problem persists, check the Vercel function logs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentJobs?.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {job.category || "General"}
                      </span>
                      {job.created_at && (
                        <span className="text-xs text-gray-400">
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {job.title}
                    </h2>

                    <div className="flex flex-col space-y-2 mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          ></path>
                        </svg>
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        {job.location}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                      {job.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link href={`/jobs/${job.id}`} className="block">
                        <button className="w-full py-2 px-4 bg-gray-50 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold rounded-lg transition-colors duration-200 text-sm border border-gray-100 hover:border-transparent">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {filteredJobs.length === 0 && !loading && (
                <div className="col-span-full text-center py-16">
                  <div className="mx-auto h-12 w-12 text-gray-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No jobs found
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsContent />
    </Suspense>
  );
}
