// Dashboard.jsx
import React from "react";
import Upes_logo from "../../assets/UPES-logo.svg";
import Base from "../../Component/Base";
import { Link } from "react-router-dom";
const Dashboard = () => {
  // get user data from local storage
  const data = JSON.parse(localStorage.getItem("user"));
  const userdata = data.dbRes;

  return (
    <Base title="Dashboard">
      <div className="dashboard bg-background min-h-screen ">
        {/* a box */}
        <div className=" bg-primary rounded-b-xl shadow-md p-8">
          <div className="flex mx-16 items-center justify-between">
            {/* div rounded user dummmy image */}
            <div className="flex space-x-8 items-center justify-between ">
              <div className="w-20 h-20 rounded-full bg-white"></div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {userdata.firstName} {userdata.lastName}
                </h2>
                <p className="text-white">{userdata.programName ? 
                  userdata.programName : "Program Name"}</p>  
             

                <p className="text-white">
                  {userdata.sapId ? userdata.sapId : "SAP ID"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 p-8 gap-8">
          {/* Clearance Status */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">Status</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 border rounded-md">
                <span className="font-medium text-gray-800">Library Due</span>
                <span className="text-green-500">Cleared</span>
              </li>
              <li className="flex justify-between items-center p-2 border rounded-md">
                <span className="font-medium text-gray-800">Finance Due</span>
                <span className="text-yellow-500">Pending</span>
              </li>
              <li className="flex justify-between items-center p-2 border rounded-md">
                <span className="font-medium text-gray-800">
                  Document Pendency
                </span>
                <span className="text-green-500">Cleared</span>
              </li>
            </ul>
            <button className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300">
              <Link to="/status">View Details</Link>
            </button>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Dashboard;
