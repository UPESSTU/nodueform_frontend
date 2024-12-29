// create a suitable AdminBase component in src/Admin/Component/AdminBase.jsx that will be used in all the admin pages. with side bar

import React from "react";
import { Link } from "react-router-dom";

const AdminBase = ({ children }) => {
    return (
        <div className="flex">
        <div className="w-1/4 bg-blue-500 h-screen">
            <div className="p-4">
            <h1 className="text-white text-2xl">Admin Panel</h1>
            <ul className="mt-4">
                <li className="text-white">
                <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="text-white">
                <Link to="/admin/profile">Profile</Link>
                </li>
                <li className="text-white">
                <Link to="/admin/student-details">Student Details</Link>
                </li>
                <li className="text-white">
                <Link to="/admin/status">Status</Link>
                </li>
                <li className="text-white">
                <Link to="/admin/update-profile">Update Profile</Link>
                </li>
            </ul>
            </div>
        </div>
        <div className="w-3/4">{children}</div>
        </div>
    );
    }

export default AdminBase;