import axios from "axios";

const API = "http://localhost:8000";


const getToken = () => {
  const user = localStorage.getItem("user");
  let token = null;

  if (user) {
    const parsedUser = JSON.parse(user);
    token = parsedUser.token; // Update the outer `token` variable
    console.log("Token:", token);
  } else {
    console.log("User not found in localStorage");
  }

  return token;
};

export const getStudents = async () => {
  try {
    // Retrieve and parse the user from localStorage
  

    // Make the API call with the token
    const res = await axios.get(`${API}/user/profile`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Error during API call:", error.response || error.message);
    return error.response;
  }
};

// get dues

export const getDues = async () => {
    try {
        // Retrieve and parse the user from localStorage
    
      console.log("Token:", getToken());
        // Make the API call with the token
        const res = await axios.get(`${API}/due/dues`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        });
    
        return res;
    } catch (error) {
        console.error("Error during API call:", error.response || error.message);
        return error.response;
    }
    }
    

  // get all documents 

  export const getDocuments = async () => {
    try {
        // Retrieve and parse the user from localStorage
    
        // Make the API call with the token
        const res = await axios.get(`${API}/document/documents`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        });
    
        return res;
    } catch (error) {
        console.error("Error during API call:", error.response || error.message);
        return error.response;
    }
    }