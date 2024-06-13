import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    return response.data;
};

const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
};

const currentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/current-user`, { withCredentials: true });
        return response.data.data; // Return the data property
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
};

const authApi = {
    register,
    login,
    logout,
    currentUser
};

export default authApi;