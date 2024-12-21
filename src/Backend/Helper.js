
import axios from 'axios';


// const API = process.env.API_URL;
const API = 'https://testservercloud.site/refund';
// signin api /auth/signin

export const signin = async (user) => {
    try {
        const res = await axios.post(`${API}/auth/signin`, user);
        return res;
    } catch (error) {
        return error.response;
    }
}

