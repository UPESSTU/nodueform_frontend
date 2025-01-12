import React, { useEffect, useState } from "react";
import InputField from "../../Component/InputField";
import Base from "../../Component/Base";
import { updateStudent, getUser } from "../../Backend/Helper";
import AlertBox from "../../Component/AlertBox";
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
  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(""); // Track error message
  const [successMessage, setSuccessMessage] = useState(""); // Track success message

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
    setLoading(true); // Set loading to true while submitting
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

    // Check if any required fields are empty
    if (
      !firstName ||
      !lastName ||
      !sapId ||
      !programName ||
      !batch ||
      !dateOfBirth ||
      !adhaarNumber ||
      !contactNumber ||
      !apaarId
    ) {
      setErrorMessage("Please fill out all the fields.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    updateStudent(user)
      .then((data) => {
        setLoading(false); // Set loading to false when API call is complete
        if (data) {
          setSuccessMessage(data.message || "Student updated successfully.");
          // after 2 seconds, redirect to dashboard
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
          setErrorMessage(""); // Clear error message if update is successful
        } else {
          setErrorMessage("Failed to update student. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of error
        setErrorMessage("Error updating student. Please try again.");
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

            {errorMessage && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <AlertBox severity="error" title="Error" message={errorMessage} />
              </div>
            )}

            {successMessage && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <AlertBox
                  severity="success"
                  title="Success"
                  message={successMessage}
                />
              </div>
            )}

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
              <button
                type="submit"
                className={`mt-4 w-full py-2 px-4 rounded-lg transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-secondary"
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default Update;
