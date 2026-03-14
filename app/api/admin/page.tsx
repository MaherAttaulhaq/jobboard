import React from "react";

const adminpage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add New Job Listing Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Job Listing</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Job Title"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              type="text"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Location"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              placeholder="Category"
            />
          </div>
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Job Description"
            />
          </div>
          <div className="md:col-span-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>

      {/* Delete Job Listings */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Delete Job Listings</h2>
        {/* Replace this with actual job listing data from your database */}
        <ul className="divide-y divide-gray-200">
          <li className="py-2">
            <span className="mr-4">Software Engineer at Google</span>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete
            </button>
          </li>
          <li className="py-2">
            <span className="mr-4">Web Developer at Facebook</span>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default adminpage;
