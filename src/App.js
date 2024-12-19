import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "./Page/Login/Login";
import Dashboard from "./Page/Dashboard/Dashboard";
// import Dashboard from "./pages/Dashboard"; // Example, create this page similarly
// import ForgotPassword from "./pages/ForgotPassword"; // Example, create this page similarly

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
