import React, { useState, useEffect, useMemo } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  getDocuments,
  getDocumentsById,
  getDueById,
  getDues,
  getFiles,
  updateDue,
} from "../../Backend/AdminHelper";
import AdminBase from "../Component/AdminBase";
import { render } from "@testing-library/react";

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
        {documents && documents.length > 0 ? (
          documents.map((doc, index) => (
            <div key={index}>
              <h3>{doc.name || "Unnamed Document"}</h3>

              {/* Check for Image Type */}
              {doc.type === "image" ? (
                <img
                  src={doc}
                  alt={doc.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    display: "block",
                  }}
                  onError={(e) => {
                    console.error("Error loading image", e);
                    e.target.style.display = "none"; // Hide image if it fails
                  }}
                />
              ) : doc.type === "pdf" ? (
                // Base64 approach for PDF rendering
              //  use ifram
                <iframe
                  title={doc.name}
                  src={doc.url}
                  style={{
                    width: "100%",
                    height: "500px",
                    border: "none",
                  }}
                ></iframe>
              ) : doc.type === "other" ? (
                <p>Unsupported file type: {doc.name}</p>
              ) : (
                <p>Unknown file type.</p>
              )}
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
  const [error, setError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const openDocumentsModal = (docs) => {
    setDocuments(docs);
    setModalOpen(true);
  };

  const closeDocumentsModal = () => {
    setModalOpen(false);
    setDocuments([]);
  };

  const getDuesofIndividualStudent = async (id) => {
    try {
      const response = await getDueById(id);
      const dueData = response?.data?.dbRes;
      const departmentRole = JSON.parse(localStorage.getItem("user"))?.dbRes
        ?.role;
      const fields = departmentFields[departmentRole] || [];

      const studentDueData = fields.reduce((acc, field) => {
        acc[field] = dueData[field];
        return acc;
      }, {});

      return studentDueData;
    } catch (err) {
      setError("Failed to fetch due data.");
      return null;
    }
  };
const handleViewDocuments = async (id) => {
  try {
    const response = await getDocumentsById(id);
    const documentData = response?.data?.dbRes;
    if (!documentData) throw new Error("No document data found.");

    console.log("Document Data:", documentData);

    const files = await Promise.all(
      Object.keys(documentData).map(async (key) => {
        const fileInfo = documentData[key]?.file?._id;
        if (!fileInfo) {
          console.error(`No file info for key: ${key}`);
          return null; // Return null if there's no file info
        }

        // Fetch the file from the server
        try {
          const fileResponse = await getFiles(fileInfo);
          console.log(`File Response for ${key}:`, fileResponse); // Log fileResponse

          if (fileResponse && fileResponse.data) {
            // Check content-type before proceeding
            const contentType = fileResponse.headers["content-type"];
            console.log("Content Type:", contentType);

            // Handling image type files (e.g., JPEG, PNG)
            if (
              contentType.includes("image/jpeg") ||
              contentType.includes("image/png")
            ) {
              const blobURL = URL.createObjectURL(fileResponse.data); // Create Blob URL for images
              return { name: key, url: blobURL, type: "image" };
            }
            // Handling PDF files
            else if (contentType.includes("application/pdf")) {
              const blobURL = URL.createObjectURL(fileResponse.data); // Create Blob URL for PDFs
              return { name: key, url: blobURL, type: "pdf" };
            }
            // For other file types
            else {
              const blobURL = URL.createObjectURL(fileResponse.data); // Create Blob URL for other file types
              return { name: key, url: blobURL, type: "other" };
            }
          } else {
            console.error(`No file data found for ${key}`);
            return null; // Return null if no file data found
          }
        } catch (err) {
          console.error(`Error fetching file for ${key}:`, err);
          return null; // Handle API failure gracefully
        }
      })
    );

    // Filter out null or invalid files
    const validFiles = files.filter((file) => file !== null);
    console.log("Valid Files:", validFiles); // Log valid files

    openDocumentsModal(validFiles); // Pass valid files to modal
  } catch (err) {
    setError("Failed to fetch documents or files.");
    console.error("Error fetching documents:", err);
  }
};


  // Helper function to convert file data to Base64
  // Helper function to convert file data to Base64 using FileReader
  const convertToBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // replace octet with pdf 
      reader.readAsDataURL(new Blob([fileData], { type: "application/pdf" }));

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (sapId, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.sapId === sapId ? { ...row, [field]: value } : row
      )
    );
    setHasUnsavedChanges(true);
  };

  // Combine useEffect to load the documents and due data once
  useEffect(() => {
    const loadData = async () => {
      try {
        const documentData = await getDocuments();
        if (documentData?.data?.dbRes?.docs) {
          const formattedRows = await Promise.all(
            documentData.data.dbRes.docs.map(async (document, index) => {
              const dueData = await getDuesofIndividualStudent(
                document.student._id
              );
              return {
                id: `${document.student._id}`,
                name: `${document.student.firstName} ${document.student.lastName}`,
                sapId: document.student.sapId,
                email: document.student.emailAddress,
                createdAt: new Date(document.createdAt).toLocaleString(),
                updatedAt: new Date(document.updatedAt).toLocaleString(),
                ...dueData,
              };
            })
          );
          setRows(formattedRows);
        }
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = useMemo(() => {
    const studentFields = ["name", "email", "sapId", "createdAt", "updatedAt"];
    const dueFields = rows[0]
      ? Object.keys(rows[0]).filter((field) => !studentFields.includes(field))
      : [];

    const staticColumns = studentFields.map((field) => ({
      field,
      headerName: field.charAt(0).toUpperCase() + field.slice(1),
      width: 200,
    }));

    const dynamicColumns = dueFields.map((field) => {
      if (field.includes("remark")) {
        return {
          field,
          headerName: field.charAt(0).toUpperCase() + field.slice(1),
          width: 200,
          renderCell: (params) => (
            <input
              type="text"
              value={params.row[field] || ""}
              placeholder="Add Remark"
              onChange={(e) =>
                handleChange(params.row.sapId, field, e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            />
          ),
        };
      }

      if (field.includes("status")) {
        return {
          field,
          headerName: field.charAt(0).toUpperCase() + field.slice(1),
          width: 200,
          renderCell: (params) => (
            <select
              value={params.row[field] || "PENDING"}
              onChange={(e) =>
                handleChange(params.row.sapId, field, e.target.value)
              }
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="PENDING">Pending</option>
              <option value="IN-REVIEW">In Review</option>
              <option value="SUCCESS">Success</option>
              <option value="REJECTED">Rejected</option>
            </select>
          ),
        };
      }

      return {
        field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1),
        width: 200,
      };
    });

    const documentColumn = {
      field: "documents",
      headerName: "View Documents",
      width: 200,
      renderCell: (params) => (
        <button
          onClick={() => handleViewDocuments(params.row.id)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          View Documents
        </button>
      ),
    };

    return [...staticColumns, ...dynamicColumns, documentColumn];
  }, [rows]);

  const saveChanges = async () => {
    try {
      const response = await updateDue(rows);
      if (response?.data?.dbRes) {
        setHasUnsavedChanges(false);
      }
    } catch (err) {
      setError("Error saving changes.");
    }
  };

  return (
    <AdminBase>
      <div style={{ height: 600, width: "100%", padding: "20px" }}>
        <h1 className="text-3xl mb-6">Student Dues</h1>
        {error && <div className="error-message">{error}</div>}
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
        {/* {renderSaveButton()} */}
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