
import axios from 'axios';


// const API = process.env.API_URL;
const API = 'http://localhost:8000';
const getToken = () => {
  const user = localStorage.getItem("user");
  let token = null;

  if (user) {
    const parsedUser = JSON.parse(user);
    token = parsedUser.token; // Update the outer `token` variable
    // console.log("Token:", token);
  } else {
    console.log("User not found in localStorage");
  }

  return token;
};

// signin api /auth/signin

export const signin = async (user) => {
    try {
        const res = await axios.post(`${API}/auth/signin`, user);
        return res;
    } catch (error) {
        return error.response;
    }
}

export const getUser = async () => {
    try {
        const res = await axios.get(`${API}/user/profile`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}


// update api

export const updateStudent = async (student) => {
    try {
        const res = await axios.put(`${API}/user/student/update`, student, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}



// file upload

export const uploadFile = async (file) => {
    console.log("File:", file);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post(`${API}/file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}


// create document

export const createDocument = async (document) => {
    try {
        const res = await axios.post(`${API}/document/create`, document, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}

// create due

export const createDue = async (due) => {
    try {
        const res = await axios.post(`${API}/due/create`, due, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}

// get due

export const getDue = async () => {
    try {
        const res = await axios.get(`${API}/due/due`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
}
