import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../../Component/Base";
import { getUser } from "../../Backend/Helper";

const Profile = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch user data only once when the component mounts
  useEffect(() => {
    getUser()
      .then((data) => {
        if (data && data.data && data.data.dbRes) {
          setStudentData(data.data.dbRes);
        } else {
          console.error("Error fetching user data:", data);
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Show a loading indicator while the data is being fetched
  if (loading) {
    return (
      <Base>
        <div className="flex items-center justify-center min-h-screen">
          <h2 className="text-lg font-semibold">Loading...</h2>
        </div>
      </Base>
    );
  }

  return (
    <Base>
      <div className="bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-primary text-center mb-6">
            Profile Details
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  studentData.firstName || "User"
                }&background=random`}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full shadow-lg"
              />
            </div>
            <div className="font-bold text-neutral">Name:</div>
            <div>{`${studentData.firstName || ""} ${
              studentData.lastName || ""
            }`}</div>

            <div className="font-bold text-neutral">SAP ID:</div>
            <div>{studentData.sapId || "Please Update"}</div>

            <div className="font-bold text-neutral">Enrollment No.:</div>
            <div>{studentData.username || "Please Update"}</div>

            <div className="font-bold text-neutral">School:</div>
            <div>{studentData.schoolName || "Please Update"}</div>

            <div className="font-bold text-neutral">Program of Study:</div>
            <div>{studentData.programName || "Please Update"}</div>

            <div className="font-bold text-neutral">Semester:</div>
            <div>{studentData.semester || "Please Update"}</div>

            <div className="font-bold text-neutral">Batch:</div>
            <div>{studentData.batch || "Please Update"}</div>

            <div className="font-bold text-neutral">Email ID:</div>
            <div className="break-words">
              <a
                href={`mailto:${studentData.emailAddress || ""}`}
                className="text-primary hover:underline"
              >
                {studentData.emailAddress || "Please Update"}
              </a>
            </div>

            <Link
              to="/update-profile"
              className="col-span-2 text-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
