import React, { use, useEffect, useState } from "react";
import Base from "../../Component/Base";
import {
  createDocument,
  createDue,
  getUser,
  uploadFile,
} from "../../Backend/Helper";
import AlertBox from "../../Component/AlertBox";

const NoDueForm = () => {
  const [sapId, setSapId] = useState("");
  const [Name, setName] = useState("");
  const [School, setSchool] = useState("");
  const [Program, setProgram] = useState("");
  const [Batch, setBatch] = useState("");
  const [DOB, setDOB] = useState("");
  const [Adhaar, setAdhaar] = useState("");
  const [Contact, setContact] = useState("");
  const [Apaar, setApaar] = useState("");
  const [details, setDetails] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Track error message
  const [successMessage, setSuccessMessage] = useState(""); // Track success message

  const [dues, setDues] = useState({
    libraryDue: "NO",
    financeDue: "NO",
    documentDue: "NO",
    hostelDue: "NO",
    transportDue: "NO",
    sdlDue: "NO",
    csdOfferLetterDue: "NO",
    alumniRegistrationDue: "NO",
  });
  const [files, setfiles] = useState({
    passportPhoto: "",
    classTenMarksheet: "",
    studentSignature: "",
    adhaarCardFront: "",
    adhaarCardBack: "",
    gazetteNotification: "",
    newspaperCutting: "",
    notarizeAffidavit: "",
  });

  const [filesafterUpload, setFilesAfterUpload] = useState({
    passportPhoto: "",
    classTenMarksheet: "",
    studentSignature: "",
    adhaarCardFront: "",
    adhaarCardBack: "",
    gazetteNotification: "",
    newspaperCutting: "",
    notarizeAffidavit: "",
  });

  const handleDuesChange = (e) => {
    setDues({ ...dues, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, setFile) => {
    setfiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // Function to handle file upload
  useEffect(() => {
    getUser()
      .then((data) => {
        if (data && data.data && data.data.dbRes) {
          setName(data.data.dbRes.firstName || "");
          setSapId(data.data.dbRes.sapId || "");
          setProgram(data.data.dbRes.programName || "");
          setBatch(data.data.dbRes.batch || "");
          setSchool(data.data.dbRes.schoolName || "");
          setDOB(data.data.dbRes.dateOfBirth || "");
          setAdhaar(data.data.dbRes.adhaarNumber || "");
          setContact(data.data.dbRes.contactNumber || "");
          setApaar(data.data.dbRes.apaarId || "");
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
        setErrorMessage("Error fetching user data.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedFiles = {};

    for (let key in files) {
      if (!files[key]) continue;

      try {
        const data = await uploadFile(files[key]);
        uploadedFiles[key] = data.data.dbRes._id;
      } catch (error) {
        console.error(`Error uploading ${key}:`, error);
        setErrorMessage(`Error uploading ${key}.`);
        return; // Optionally handle the error and stop further execution
      }
    }

    // Append additional details
    if (uploadedFiles.gazetteNotification) {
      uploadedFiles.gazetteSerial = details.gazetteSerial || "";
    }

    try {
      const response = await createDocument(uploadedFiles);
      console.log("Document created successfully:", response);
    } catch (error) {
      console.error("Error creating document:", error);
      setErrorMessage("Error creating document.");
    }
    // UPLOAD dues

    try {
      const response = await createDue(dues);
      console.log("Dues created successfully:", response);
      setSuccessMessage("No Due Form submitted successfully.");
    } catch (error) {
      console.error("Error creating dues:", error);
      setErrorMessage("Error submitting No Due Form.");
    }
  };

  return (
    <Base title="No Due Form">
      <div className="no-due-form bg-background min-h-screen p-8">
        {errorMessage &&
          AlertBox({
            severity: "error",
            title: "Error",
            message: errorMessage,
          })}
        {successMessage &&
          AlertBox({
            severity: "success",
            title: "Success",
            message: successMessage,
          })}
        <h2 className="text-2xl font-semibold text-primary mb-4">
          No Due Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="sapId"
              className="block text-sm font-medium text-gray-700"
            >
              SAP ID
            </label>
            <input
              id="sapId"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={sapId}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={Name}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              School
            </label>
            <input
              id="school"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={School}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="program"
              className="block text-sm font-medium text-gray-700"
            >
              Program
            </label>
            <input
              id="program"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={Program}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="batch"
              className="block text-sm font-medium text-gray-700"
            >
              Batch
            </label>
            <input
              id="batch"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={Batch}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className="mt-1 p-2 w-full border rounded-md"
              value={DOB}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="adhaar"
              className="block text-sm font-medium text-gray-700"
            >
              Adhaar Number
            </label>
            <input
              id="adhaar"
              type="number"
              className="mt-1 p-2 w-full border rounded-md"
              value={Adhaar}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="number"
              className="mt-1 p-2 w-full border rounded-md"
              value={Contact}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="apaar"
              className="block text-sm font-medium text-gray-700"
            >
              Apaar ID
            </label>
            <input
              id="apaar"
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={Apaar}
              readOnly
            />
          </div>
          <h1 className="text-2xl font-semibold text-primary mb-4">
            NO DUES INFORMATION
          </h1>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Library Dues
            </label>
            {/* type option */}
            <select
              id="Library Dues"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.libraryDue}
              name="libraryDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Finance Dues
            </label>
            {/* type option */}
            <select
              id="Finance Dues"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.financeDue}
              name="financeDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Document Pendency
            </label>
            {/* type option */}
            <select
              id="Document Pendency"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.documentDue}
              name="documentDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Hostel Dues
            </label>
            <select
              id="Hostel Dues"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.hostelDue}
              name="hostelDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Transportation Dues
            </label>
            <select
              id="Transportation Dues"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.transportDue}
              name="transportDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              School/Department/Labs Dues
            </label>
            <select
              id="School/Department/Labs Dues"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.sdlDue}
              name="sdlDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Career Service(Offer Letter Submitted)
            </label>
            <select
              id=" Career Service"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.csdOfferLetterDue}
              name="csdOfferLetterDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
              <option value="NOT APPLICABLE">Not Applicable</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700"
            >
              Alumni Registration
            </label>
            <select
              id=" Alumni"
              className="mt-1 p-2 w-full border rounded-md"
              value={dues.alumniRegistrationDue}
              name="alumniRegistrationDue"
              onChange={handleDuesChange}
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              DOCUMENTS
            </h1>

            <p className="text-xs mb-6 text-gray-500">
              Upload the required documents for verification
            </p>
            {/* line */}
            <label
              htmlFor="doc1"
              className="block text-sm font-medium text-gray-700"
            >
              Passport size Photograph
            </label>

            <input
              type="file"
              id="Photograph"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              name="passportPhoto"
              required
              onChange={handleFileUpload}
            />

            <label
              htmlFor="doc2"
              className="block text-sm font-medium text-gray-700"
            >
              Class 10th Marksheet / Passing Certificate
            </label>

            <input
              type="file"
              id="marksheets"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              name="classTenMarksheet"
              required
              onChange={handleFileUpload}
            />

            <label
              htmlFor="doc3"
              className="block text-sm font-medium text-gray-700"
            >
              Student Signature
            </label>
            <input
              type="file"
              id="signature"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              name="studentSignature"
              required
              onChange={handleFileUpload}
            />
            <label
              htmlFor="doc4"
              className="block text-sm font-medium text-gray-700"
            >
              Aadhaar Card(Front Side)
            </label>
            <input
              type="file"
              id="aadhaar"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              required
              name="adhaarCardFront"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="doc5"
              className="block text-sm font-medium text-gray-700"
            >
              Aadhaar Card(Back Side)
            </label>
            <input
              type="file"
              id="aadhaar"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              required
              name="adhaarCardBack"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="doc6"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              In case of Legal Name Change
            </label>
            <p className="text-xs mb-6 text-gray-500">
              Upload the required documents for verification
            </p>
            <label
              htmlFor="doc7"
              className="block text-sm font-medium text-gray-700"
            >
              a. Gazette Notification(mention the serial number)
            </label>
            <input
              type="file"
              id="gazette"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              name="gazetteNotification"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="gazetteSerial"
              className="block text-sm font-medium text-gray-700"
            >
              Gazette Notification Serial Number
            </label>
            <input
              type="text"
              id="gazetteSerial"
              className="my-2 p-2 w-full border rounded-md"
              value={details.gazetteSerial || ""}
              onChange={(e) =>
                setDetails({ ...details, gazetteSerial: e.target.value })
              }
              defaultValue="N/A"
            />

            <label
              htmlFor="doc8"
              className="block text-sm font-medium text-gray-700"
            >
              b. Name updation announcement in the two local newspapers
            </label>

            <input
              type="file"
              id="newspapers"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              name="newspaperCutting"
              onChange={handleFileUpload}
            />

            <label
              htmlFor="doc9"
              className="block text-sm font-medium text-gray-700"
            >
              c. Notarize affidavit in Rs. 100 stamp paper
            </label>
            <input
              type="file"
              id="affidavit"
              className="my-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
              name="notarizeAffidavit"
              onChange={handleFileUpload}
            />

            <p className="text-xs mb-6 text-gray-500">
              Note: Upload only jpg, jpeg, png, pdf files
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </Base>
  );
};

export default NoDueForm;
