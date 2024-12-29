import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AdminBase from "../Component/AdminBase";
import { getDocuments, getDues } from "../../Backend/AdminHelper";

const StudentDetails = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dues and format them for DataGrid
  useEffect(() => {
    getDues().then((data) => {
      if (data && data.data && data.data.dbRes && data.data.dbRes.docs) {
        const formattedRows = data.data.dbRes.docs.map((due, index) => ({
          id: due._id, // Required by DataGrid for unique identification
          name: `${due.student.firstName} ${due.student.lastName}`,
          email: due.student.emailAddress,
          createdAt: new Date(due.createdAt).toLocaleString(),
          updatedAt: new Date(due.updatedAt).toLocaleString(),
        }));
        setRows(formattedRows);
      } else {
        console.error("Failed to fetch dues or invalid response format.");
      }
      setLoading(false);
    });

    // get documents from getdocuments and map them with the student 
    getDocuments().then((data) => {
      if (data && data.data && data.data.dbRes && data.data.dbRes.docs) {
        const formattedRows = data.data.dbRes.docs.map((document, index) => ({
          id: document._id, // Required by DataGrid for unique identification
          name: `${document.student.firstName} ${document.student.lastName}`,
          email: document.student.emailAddress,
          createdAt: new Date(document.createdAt).toLocaleString(),
          updatedAt: new Date(document.updatedAt).toLocaleString(),
        }));
        setRows(formattedRows);
      } else {
        console.error("Failed to fetch documents or invalid response format.");
      }
      setLoading(false);
    }
    );
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "createdAt", headerName: "Dues Created At", width: 200 },
    { field: "updatedAt", headerName: "Last Updated", width: 200 },
    
  ];

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
      </div>
    </AdminBase>
  );
};

export default StudentDetails;
