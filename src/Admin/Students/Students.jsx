import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  getDocuments,
  getDocumentsById,
  getDueById,
  getDues,
  getFiles,
} from "../../Backend/AdminHelper";
import AdminBase from "../Component/AdminBase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const departmentFields = {
  LIBRARY_DEPT: ["libraryDue", "libraryRemark", "libraryStatus"],
  FINANCE_DEPT: ["financeDue", "financeRemark", "financeStatus"],
  SRE_DEPT: ["documentDue", "documentRemark", "documentStatus"],
  CS_DEPT: [
    "csdOfferLetterDue",
    "csdOfferLetterRemark",
    "csdOfferLetterStatus",
    "alumniRegistrationDue",
    "alumniRegistrationRemark",
    "alumniRegistrationStatus",
  ],
  APO_DEPT: [
    "hostelDue",
    "hostelRemark",
    "hostelStatus",
    "transportDue",
    "transportRemark",
    "transportStatus",
  ],
  SOCS_DEPT: ["sdlDue", "sdlRemark", "sdlStatus"],
  SOHST_DEPT: ["sdlDue", "sdlRemark", "sdlStatus"],
  SOAE_DEPT: ["sdlDue", "sdlRemark", "sdlStatus"],
  SOL_DEPT: ["sdlDue", "sdlRemark", "sdlStatus"],
  SOB_DEPT: ["sdlDue", "sdlRemark", "sdlStatus"],
  SOD_DEPT: ["sdlDue", "sdlRemark", "sdlStatus"],
};

const DocumentsModal = ({ open, handleClose, documents }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <h2 id="modal-modal-title">Student Documents</h2>
      <div id="modal-modal-description">
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <div key={index}>
              <h3>{doc.name || "Unnamed Document"}</h3>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            </div>
          ))
        ) : (
          <p>No documents available.</p>
        )}
      </div>
    </Box>
  </Modal>
);

const StudentDetails = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [departmentSchema, setDepartmentSchema] = useState({});
  const [columns, setColumns] = useState([]);

  const openDocumentsModal = (docs) => {
    console.log("Opening documents modal with:", docs);
    setDocuments(docs);
    setModalOpen(true);
  };

  const closeDocumentsModal = () => {
    setModalOpen(false);
    setDocuments([]);
  };

  useEffect(() => {
    getDocuments().then(async (data) => {
      if (data?.data?.dbRes?.docs) {
        const formattedRows = await Promise.all(
          data.data.dbRes.docs.map(async (document, index) => {
            // Fetch due data for each student asynchronously
            const dueData = await getDuesofIndividualStudent(
              document.student._id
            );
            console.log("Due Data:", dueData);

            // Return the row data with due information added
            return {
              id: `${document._id}-${index}`,
              name: `${document.student.firstName} ${document.student.lastName}`,
              studentId: document.student._id,
              sapId: document.student.sapId,
              batch: document.student.batch,
              schoolName: document.student.schoolName,
              programName: document.student.programName,
              email: document.student.emailAddress,
              createdAt: new Date(document.createdAt).toLocaleString(),
              updatedAt: new Date(document.updatedAt).toLocaleString(),
              // Add the due data to the row
              ...dueData, // Spreads the due data fields into the row
            };
          })
        );

        // Set the state for rows with the updated data
        setRows(formattedRows);
        const columns = generateColumns(formattedRows);
        setColumns(columns);
      } else {
        console.error("Failed to fetch documents or invalid response format.");
      }
      setLoading(false);
    });
  }, []);

  const getDuesofIndividualStudent = async (id) => {
    try {
      const response = await getDueById(id);
      const dueData = response?.data?.dbRes;

      if (!dueData) {
        console.error("No due data found for the given ID.");
        return null;
      }

      // Get the department role from local storage
      const departmentRole = JSON.parse(localStorage.getItem("user"))?.dbRes
        .role;
      console.log("Department Role:", departmentRole);
      // Get the relevant fields for the current department
      const fields = departmentFields[departmentRole] || [];
      console.log("Fields for department:", fields);
      // Extract only the relevant fields
      const studentDueData = fields.reduce((acc, field) => {
        acc[field] = dueData[field];
        console.log(field);
        return acc;
      }, {});

      console.log("Student Due Data:", studentDueData);
      return studentDueData;
    } catch (err) {
      console.error("Failed to fetch dues:", err);
      return null;
    }
  };

  const handleViewDocuments = async (id) => {
    try {
      const response = await getDocumentsById(id);
      const documentData = response?.data?.dbRes;

      if (!documentData) {
        console.error("No document data found for the given ID.");
        return;
      }

      console.log("Document Data:", documentData);

      const files = await Promise.all(
        Object.keys(documentData).map(async (key) => {
          const fileInfo = documentData[key]?.file?._id;
          console.log(`Processing Key: ${key}, File Info:`, fileInfo);

          if (fileInfo) {
            try {
              const fileResponse = await getFiles(fileInfo);
              console.log(`File Response for ${key}:`, fileResponse);

              if (fileResponse?.data) {
                // Convert the raw data to a Blob URL
                const blob = new Blob([fileResponse.data], {
                  type: fileResponse.headers["content-type"],
                });
                const url = URL.createObjectURL(blob);
                return { name: key, url };
              } else {
                console.warn(`Invalid file response for ${key}`);
              }
            } catch (error) {
              console.error(`Error fetching file for key: ${key}`, error);
            }
          } else {
            console.warn(`No valid file ID for ${key}`);
          }
          return null;
        })
      ).then((results) => results.filter(Boolean));

      console.log("Processed Files:", files);

      openDocumentsModal(files);
    } catch (err) {
      console.error("Failed to fetch documents or files:", err);
    }
  };
const handleRemarkChange = (rowId, newRemark) => {
  console.log(`Remark updated for row ${rowId}:`, newRemark);
  // Implement logic to update the remark in the backend or state
};

const handleStatusChange = (rowId, newStatus) => {
  console.log(`Status updated for row ${rowId}:`, newStatus);
  // Implement logic to update the status in the backend or state
};

useEffect(() => {
  getDocuments().then(async (data) => {
    if (data?.data?.dbRes?.docs) {
      const formattedRows = await Promise.all(
        data.data.dbRes.docs.map(async (document, index) => {
          const dueData = await getDuesofIndividualStudent(
            document.student._id
          );
          return {
            id: `${document._id}-${index}`,
            name: `${document.student.firstName} ${document.student.lastName}`,
            studentId: document.student._id,
            sapId: document.student.sapId,
            batch: document.student.batch,
            schoolName: document.student.schoolName,
            programName: document.student.programName,
            email: document.student.emailAddress,
            createdAt: new Date(document.createdAt).toLocaleString(),
            updatedAt: new Date(document.updatedAt).toLocaleString(),
            remark: "", // Default remark value
            status: "PENDING", // Default status value
            ...dueData, // Add due data fields dynamically
          };
        })
      );

      setRows(formattedRows);
      const columns = generateColumns(
        formattedRows,
        handleRemarkChange,
        handleStatusChange
      );
      setColumns(columns);
    } else {
      console.error("Failed to fetch documents or invalid response format.");
    }
    setLoading(false);
  });
}, []);

  const generateColumns = (data, handleRemarkChange, handleStatusChange) => {
    // Extract the field names from the first row of data (or you can use a template for specific fields)
    const studentFields = [
      "name",
      "email",
      "sapId",
      "batch",
      "schoolName",
      "programName",
      "createdAt",
      "updatedAt",
    ];

    // Extract the due fields dynamically (assuming dueData is an object with different properties)
    const dueFields = Object.keys(data[0] || {}).filter(
      (key) => key !== "studentId" && key !== "id"
    ); // Adjust based on actual data shape

    // Combine studentFields and dueFields to form the column definitions
    const dynamicColumns = [
      ...studentFields.map((field) => ({
        field: field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1), // Capitalize first letter for display
        width: 200,
      })),
      ...dueFields.map((field) => ({
        field: field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1), // Capitalize first letter for display
        width: 200,
      })),
      {
        field: "remark",
        headerName: "Remark",
        width: 300,
        renderCell: (params) => (
          <input
            type="text"
            defaultValue={params.row.remark || ""}
            className="p-1 border rounded-md w-full"
            onChange={(e) => handleRemarkChange(params.row.id, e.target.value)}
            placeholder="Add remark"
            aria-label="Add Remark"
          />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        renderCell: (params) => (
          <select
            defaultValue={params.row.status || "PENDING"}
            className="p-1 border rounded-md w-full"
            onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
            aria-label="Change Status"
          >
            <option value="PENDING">PENDING</option>
            <option value="IN-REVIEW">IN-REVIEW</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        ),
      },
      {
        field: "documents",
        headerName: "View Documents",
        width: 200,
        renderCell: (params) => (
          <button
            onClick={() => handleViewDocuments(params.row.studentId)}
            className="bg-blue-500 text-white p-2 rounded-md"
            aria-label="View Documents"
          >
            View Documents
          </button>
        ),
      },
    ];

    return dynamicColumns;
  };

  return (
    <AdminBase>
      <div style={{ height: 600, width: "100%", padding: "20px" }}>
        <h1 className="text-3xl mb-6">Student Dues</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          loading={loading}
          disableSelectionOnClick
          autoHeight
        />
        {!loading && rows.length === 0 && <p>No data available.</p>}
      </div>

      <DocumentsModal
        open={modalOpen}
        handleClose={closeDocumentsModal}
        documents={documents}
      />
    </AdminBase>
  );
};

export default StudentDetails;
