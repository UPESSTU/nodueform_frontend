import React, { useEffect, useState } from "react";
import Upes_logo from "../../assets/UPES-logo.svg";
import Base from "../../Component/Base";
import { Link } from "react-router-dom";
import { getDue } from "../../Backend/Helper";

const Dashboard = () => {
  // get user data from local storage
  const [isdue, setIsDue] = useState(false);
  const [due, setDue] = useState([]);
  const data = JSON.parse(localStorage.getItem("user"));
  const userdata = data?.dbRes || {};
  const formatDueKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
      .replace(/Due$/, "") // Remove "Due" from the end of keys
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  useEffect(() => {
    getDue()
      .then((res) => {
        if (res.data) {
          setIsDue(true);
          setDue(res.data);
        }
      })
      .catch((err) => {
        setIsDue(false);
        console.log(err);
      });
  }, []);

  return (
    <Base title="Dashboard">
      <div className="dashboard bg-background min-h-screen">
        {/* a box */}
        <div className="bg-primary rounded-b-xl shadow-md p-8">
          <div className="flex mx-16 items-center justify-between">
            {/* div rounded user dummy image */}
            <div className="flex space-x-8 items-center justify-between">
              <div className="w-20 h-20 rounded-full bg-white"></div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {userdata.firstName} {userdata.lastName}
                </h2>
                <p className="text-white">
                  {userdata.programName ? userdata.programName : "Program Name"}
                </p>
                <p className="text-white">
                  {userdata.sapId ? userdata.sapId : "SAP ID"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 p-8 gap-8">
          {/* Clearance Status */}
          {isdue && due.dbRes && typeof due.dbRes === "object" ? (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Clearance Status
              </h2>
              <ul className="space-y-2">
                {/* Filter and render fields with remark and status */}
                {Object.entries(due.dbRes || {})
                  .filter(
                    ([key, value]) =>
                      typeof value === "string" &&
                      (key.includes("Status") || key.includes("Remark"))
                  )
                  .map(([key, value], index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 border rounded-md"
                    >
                      <span className="font-medium text-gray-800">
                        {formatDueKey(key)}
                      </span>
                      <span className="text-gray-600">{value}</span>
                    </li>
                  ))}
              </ul>
              <button className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300">
                <Link to="/status">View Details</Link>
              </button>
            </div>
          ) : (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                No Due Form
              </h2>
              <p className="text-gray-800">Please fill up the no due form.</p>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Dashboard;
