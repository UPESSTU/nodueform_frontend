// create a student profile page with all the entries
//S.No.	Global ID	Enroll No.	Name	School	Program of study 	Semester	Batch	stu email id
// for displaying details of user

import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope, FaCog } from "react-icons/fa";
import Base from "../../Component/Base";


const Profile = () => {
const studentData = {
  sapId: "500123456",
  enrollNo: "UPES12345",
  name: "John Doe",
  school: "School of Computer Science",
  programOfStudy: "B.Tech Computer Science",
  semester: "5th",
  batch: "Batch 2022",
  email: "john.doe@upes.ac.in",
};

return (
    <Base>
  <div className="bg-gray-100  p-6">
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-semibold text-primary text-center mb-6">
        Profile Details
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${studentData.name}&background=random`}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full shadow-lg"
          />
        </div>
        <div className="font-bold text-neutral">Name:</div>
        <div>{studentData.name}</div>

        <div className="font-bold text-neutral">SAP ID:</div>
        <div>{studentData.sapId}</div>

        <div className="font-bold text-neutral">Enrollment No.:</div>
        <div>{studentData.enrollNo}</div>

        <div className="font-bold text-neutral">School:</div>
        <div>{studentData.school}</div>

        <div className="font-bold text-neutral">Program of Study:</div>
        <div>{studentData.programOfStudy}</div>

        <div className="font-bold text-neutral">Semester:</div>
        <div>{studentData.semester}</div>

        <div className="font-bold text-neutral">Batch:</div>
        <div>{studentData.batch}</div>

        <div className="font-bold text-neutral">Email ID:</div>
        <div>
          <a
            href={`mailto:${studentData.email}`}
            className="text-primary hover:underline"
          >
            {studentData.email}
          </a>
        </div>
        {/* update Profile Button */}
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
