import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  getAccessToken,
  getRefreshToken,
  getUser,
  getaccesstoken, // function to get new access token
} from "./Helpers";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
  const [loading, setLoading] = useState(true); // Loading state for async calls
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state

  useEffect(() => {
    const verifyTokens = async () => {
      let auth = getUser();
      console.log("auth", auth);
      let accesstoken = getAccessToken() || "";
      let refreshtoken = getRefreshToken() || "";
      console.log("hello");

      // No refresh token, redirect to login
      if (refreshtoken === "") {
        console.log("No refresh token found");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      console.log("access token", accesstoken);
      console.log("refresh token", refreshtoken);

      // If no access token, try to fetch a new one using refresh token
      if (accesstoken === "") {
        console.log("No access token found, fetching new one");
        try {
          let res = await getaccesstoken(); // Assume this is an async function
          if (res.success) {
            // Access token successfully fetched
            accesstoken = res.accessToken; // Use the new access token
          } else {
            throw new Error("Failed to get new access token");
          }
        } catch (err) {
          setIsAuthenticated(false); // If fetching access token fails
          setLoading(false);
          return;
        }
      }

      // Decode the access token and check expiration
      try {
        let { exp } = jwtDecode(getAccessToken());
        console.log("exp", exp);
        let isExpired = Date.now() >= exp * 1000;
        console.log(isExpired);

        // Check if token is expired
        if (auth && !isExpired) {
          setIsAuthenticated(true);
          console.log("User is authenticated");
        } else {
          setIsAuthenticated(false);
          console.log("User is not authenticated");
        }
      } catch (error) {
        setIsAuthenticated(false); // Error decoding token, assume invalid
      } finally {
        setLoading(false); // Done loading
      }
    };

    verifyTokens(); // Call the token verification function on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking tokens
  }

  // If authenticated, show the protected routes (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
