// create a dashboard page for admin

import React from "react";
import { Link } from "react-router-dom";
import AdminBase from "../Component/AdminBase";

const AdminDashboard = () => {
    return (
      <AdminBase>
        <div className="bg-background flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h1 className="z-10 self-start -mt-1.5 text-3xl">
              Admin Dashboard
            </h1>
            <div className="flex flex-col font-semibold text-slate-700">
              <Link
                to="/student-details"
                className="p-2 m-2 bg-blue-500 text-white rounded-md text-center"
              >
                Student Details
              </Link>
             
            </div>
          </div>
        </div>
      </AdminBase>
    );
    };

export default AdminDashboard;

