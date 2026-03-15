"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { use } from "react";
import { authClient } from "@/app/lib/auth-client";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category?: string;
  description?: string;
  created_at?: string;
}

const JobDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || session.user.name || "",
        email: prev.email || session.user.email || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${unwrappedParams.id}`);
        if (!response.ok) throw new Error("Failed to fetch job");
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [unwrappedParams.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    try {
      const response = await fetch(`/api/jobs/${unwrappedParams.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit application");
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        {loading ? (
          <div className="animate-pulse bg-white rounded-xl shadow-sm p-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ) : job ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 px-8 py-10 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                  <p className="text-blue-100 text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    {job.company}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white shadow-sm">
                    {job.category || "General"}
                  </span>
                  <p className="mt-2 text-blue-100 flex items-center gap-1 justify-end">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {job.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Job Description</h2>
                <div className="prose max-w-none text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                  {job.description || "No description provided."}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Apply for this Position</h2>
                
                {submissionStatus === "success" ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center">
                    <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="text-xl font-bold mb-1">Application Submitted!</h3>
                    <p>Thank you for applying to {job.company}. We will be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-blue-900"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-blue-900"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Resume Link (URL)</label>
                        <input
                          type="url"
                          name="resume_link"
                          required
                          value={formData.resume_link}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-blue-900"
                          placeholder="https://linkedin.com/in/..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Note (Optional)</label>
                      <textarea
                        name="cover_note"
                        rows={4}
                        value={formData.cover_note}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-gray-50 text-blue-900 resize-none"
                        placeholder="Tell us why you're a great fit for this role..."
                      ></textarea>
                    </div>

                    {submissionStatus === "error" && (
                      <p className="text-red-500 text-sm font-medium">Something went wrong. Please check your inputs and try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={submissionStatus === "submitting"}
                      className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-70 flex justify-center"
                    >
                      {submissionStatus === "submitting" ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800">Job not found</h2>
            <p className="text-gray-500 mt-2">The job you are looking for does not exist or has been removed.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
