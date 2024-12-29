import React, { useEffect, useState } from "react";
import InputField from "../../Component/InputField";
import Base from "../../Component/Base";
import { updateStudent } from "../../Backend/Helper";
import { getUser } from "../../Backend/Helper";

const Update = () => {
  const [studentData, setStudentData] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sapId, setSapId] = useState("");
  const [programName, setProgramName] = useState("");
  const [batch, setBatch] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [apaarId, setApaarId] = useState("");

  useEffect(() => {
    getUser()
      .then((data) => {
        if (data && data.data && data.data.dbRes) {
          setStudentData(data.data.dbRes);
          setFirstName(data.data.dbRes.firstName || "");
          setLastName(data.data.dbRes.lastName || "");
          setSapId(data.data.dbRes.sapId || "");
          setProgramName(data.data.dbRes.programName || "");
          setBatch(data.data.dbRes.batch || "");
          setDateOfBirth(data.data.dbRes.dateOfBirth || "");
          setAdhaarNumber(data.data.dbRes.adhaarNumber || "");
          setContactNumber(data.data.dbRes.contactNumber || "");
          setApaarId(data.data.dbRes.apaarId || "");
        } else {
          console.error("Error fetching user data:", data);
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      sapId,
      programName,
      batch,
      dateOfBirth,
      adhaarNumber,
      contactNumber,
      apaarId,
    };

    updateStudent(user)
      .then((data) => {
        if (data && data.data && data.data.dbRes && data.data.dbRes.docs) {
          console.log("Student updated successfully:", data.data.dbRes.docs);
          alert(data.message);
        } else {
          console.error("Failed to update student or invalid response format.");
          alert("Failed to update student");
        }
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <Base>
      <div className="bg-background flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col font-semibold text-slate-700"
          >
            <h1 className="z-10 self-start -mt-1.5 text-3xl">Update Profile</h1>

            <InputField
              label="First Name"
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required={firstName === ""}
            />
            <InputField
              label="Last Name"
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required={lastName === ""}
            />
            <InputField
              label="SAP ID"
              id="sapId"
              type="text"
              value={sapId}
              onChange={(e) => setSapId(e.target.value)}
              required={sapId === ""}
            />
            <InputField
              label="Program of Study"
              id="programName"
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              required={programName === ""}
            />
            <InputField
              label="Batch"
              id="batch"
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required={batch === ""}
            />
            <InputField
              label="Date of Birth"
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required={dateOfBirth === ""}
            />
            <InputField
              label="Adhaar Number"
              id="adhaarNumber"
              type="number"
              value={adhaarNumber}
              onChange={(e) => setAdhaarNumber(e.target.value)}
              required={adhaarNumber === ""}
            />
            <InputField
              label="Contact Number"
              id="contactNumber"
              type="number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required={contactNumber === ""}
            />
            <InputField
              label="Apaar ID"
              id="apaarId"
              type="text"
              value={apaarId}
              onChange={(e) => setApaarId(e.target.value)}
              required={apaarId === ""}
            />

            <div className="text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full shadow-lg"
              />
            </div>

            <div className="text-center">
              <button className="mt-4 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default Update;
