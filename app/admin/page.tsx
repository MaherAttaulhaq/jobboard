"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash2, 
  Briefcase, 
  MapPin, 
  Building2, 
  Tag, 
  Users, 
  FileText, 
  ChevronRight,
  ExternalLink,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category?: string;
  description?: string;
}

interface Application {
  id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  created_at: string;
  jobTitle: string;
  jobCompany: string;
}

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
  });

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching in the jobs:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchJobs(), fetchApplications()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add job");
      
      setFormData({
        title: "",
        company: "",
        location: "",
        category: "",
        description: "",
      });
      await fetchJobs();
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please check all fields.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <div className="flex flex-col gap-8">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-blue-500 mt-2 text-lg">Manage your job board and track candidate applications.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm self-start">
              <button
                onClick={() => setActiveTab("jobs")}
                className={cn(
                  "px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2",
                  activeTab === "jobs" 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Briefcase size={16} />
                Jobs
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={cn(
                  "px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2",
                  activeTab === "applications" 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Users size={16} />
                Applications
              </button>
            </div>
          </div>

          {activeTab === "jobs" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Plus size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-blue-900">Add New Job</h2>
                  </div>

                  <form onSubmit={handleAddJob} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-blue-800 ml-1">Job Title</label>
                      <Input
                        id="title"
                        placeholder="e.g. Software Engineer"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-blue-800 ml-1">Company</label>
                      <Input
                        id="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-blue-800 ml-1">Location</label>
                        <Input
                          id="location"
                          placeholder="Remote"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-blue-800 ml-1">Category</label>
                        <Input
                          id="category"
                          placeholder="Engineering"
                          value={formData.category}
                          onChange={handleChange}
                          className="bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-blue-800 ml-1">Description</label>
                      <Textarea
                        id="description"
                        placeholder="Enter job details..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus-visible:ring-blue-500 min-h-[120px] resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all shadow-md shadow-blue-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Publish Job Listing"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* List Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-blue-900">Active Job Listings</h2>
                    <span className="text-sm font-medium text-blue-400">{jobs.length} total</span>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {loading ? (
                      [1, 2, 3].map((i) => (
                        <div key={i} className="p-6 animate-pulse flex justify-between">
                          <div className="space-y-3 w-2/3">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                          </div>
                          <div className="h-10 w-10 bg-gray-100 rounded-lg"></div>
                        </div>
                      ))
                    ) : jobs.length === 0 ? (
                      <div className="p-20 text-center">
                        <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No jobs posted yet</h3>
                        <p className="text-gray-500">Get started by adding your first listing.</p>
                      </div>
                    ) : (
                      jobs.map((job) => (
                        <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors group">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-blue-900 group-hover:text-blue-600 transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1.5 leading-none">
                                  <Building2 size={14} className="text-gray-400" />
                                  {job.company}
                                </span>
                                <span className="flex items-center gap-1.5 leading-none">
                                  <MapPin size={14} className="text-gray-400" />
                                  {job.location}
                                </span>
                                {job.category && (
                                  <span className="flex items-center gap-1.5 leading-none px-2 py-0.5 bg-gray-100 rounded-md text-gray-600 text-xs uppercase tracking-wider font-bold">
                                    {job.category}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteJob(job.id)}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={20} />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-blue-900">Candidate Applications</h2>
                <span className="text-sm font-medium text-blue-400">{applications.length} submitted</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Candidate</th>
                      <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Job Position</th>
                      <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Applied Date</th>
                      <th className="p-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                       [1, 2, 3].map((i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="p-6"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                          <td className="p-6"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                          <td className="p-6"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                          <td className="p-6 text-right"><div className="h-8 w-20 bg-gray-100 rounded-lg ml-auto"></div></td>
                        </tr>
                       ))
                    ) : applications.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-20 text-center">
                          <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users size={32} />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">No applications yet</h3>
                          <p className="text-gray-500">Applications will appear here once candidates apply.</p>
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="p-6">
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{app.name}</span>
                              <span className="text-sm text-gray-500 font-medium">{app.email}</span>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex flex-col">
                              <span className="font-bold text-blue-600">{app.jobTitle}</span>
                              <span className="text-sm text-gray-500 font-medium">{app.jobCompany}</span>
                            </div>
                          </td>
                          <td className="p-6 text-sm font-medium text-gray-500">
                             <div className="flex items-center gap-2">
                               <Calendar size={14} className="text-gray-400" />
                               {new Date(app.created_at).toLocaleDateString()}
                             </div>
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex justify-end gap-2">
                              <a 
                                href={app.resume_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm shadow-blue-50"
                              >
                                Resume
                                <ExternalLink size={14} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
