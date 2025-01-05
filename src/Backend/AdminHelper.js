import axios from "axios";

const API = "http://localhost:8000";


const getToken = () => {
  const user = localStorage.getItem("user");
  let token = null;

  if (user) {
    const parsedUser = JSON.parse(user);
    token = parsedUser.token; // Update the outer `token` variable
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
    //get due by id

    export const getDueById = async (id) => {
        try {
            // Retrieve and parse the user from localStorage
        
            // Make the API call with the token
            const res = await axios.get(`${API}/due/due/${id}`, {
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

// getFiles

export const getFiles = async (id) => {
    try {
        // Retrieve and parse the user from localStorage
    
        // Make the API call with the token
        const res = await axios.get(`${API}/file/file/${id}`, {
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

// get getDocumentsById

export const getDocumentsById = async (id) => {
    try {
        // Retrieve and parse the user from localStorage
    
        // Make the API call with the token
        const res = await axios.get(`${API}/document/document/${id}`, {
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


// update due

export const updateDue = async (data) => {
    try {
        // Retrieve and parse the user from localStorage
    
        // Make the API call with the token
        const res = await axios.put(`${API}/due/admin-due-update`, data, {
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