// Dashboard.jsx
import React from "react";
// import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard bg-background min-h-screen p-8">
      <header className="flex items-center space-x-4 mb-8">
        <img src="./logo.png" alt="UPES Logo" className="w-16 h-16" />
        <h1 className="text-4xl text-primary font-bold">Dashboard</h1>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Clearance Status */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Clearance Status
          </h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 border rounded-md">
              <span className="font-medium text-gray-800">
                Computer Science
              </span>
              <span className="text-green-500">Cleared</span>
            </li>
            <li className="flex justify-between items-center p-2 border rounded-md">
              <span className="font-medium text-gray-800">Economics</span>
              <span className="text-yellow-500">Pending</span>
            </li>
            <li className="flex justify-between items-center p-2 border rounded-md">
              <span className="font-medium text-gray-800">Physics</span>
              <span className="text-green-500">Cleared</span>
            </li>
          </ul>
          <button className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300">
            Submit Dues
          </button>
        </div>

        {/* Dues Form */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">Dues</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Current City
              </label>
              <input
                type="text"
                id="city"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                Details
              </label>
              <textarea
                id="details"
                className="mt-1 p-2 w-full border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload documents
              </label>
              <input
                type="file"
                id="doc1"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <input
                type="file"
                id="doc2"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <input
                type="file"
                id="doc3"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
