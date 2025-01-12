import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import LoaderComponent from "./Admin/Component/Loader/Loader";
// import Dashboard from "./pages/Dashboard"; // Example, create this page similarly
// import ForgotPassword from "./pages/ForgotPassword"; // Example, create this page similarly

const LoginPage = React.lazy(() => import("./Page/Login/Login"));
const Dashboard = React.lazy(() => import("./Page/Dashboard/Dashboard"));
const Profile = React.lazy(() => import("./Page/Profile/Profile"));
const NoDueForm = React.lazy(() => import("./Page/No_Due_Form.jsx/NoDueForm"));
const StatusPage = React.lazy(() => import("./Page/Status/Status"));
const Update = React.lazy(() => import("./Page/Update/Update"));
const AdminDashboard = React.lazy(() => import("./Admin/Dashboard/Dashboard"));
const StudentDetails = React.lazy(() => import("./Admin/Students/Students"));



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoaderComponent />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form" element={<NoDueForm />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/update-profile" element={<Update />} />

          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* Add more routes as needed */}

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/student-details" element={<StudentDetails />} />
          {/* <Route path="/admin/profile" element={<AdminProfile />} /> */}
          {/* <Route path="/admin/form" element={<AdminNoDueForm />} /> */}
          {/* <Route path="/admin/status" element={<AdminStatusPage />} /> */}
          {/* <Route path="/admin/update-profile" element={<AdminUpdate />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
