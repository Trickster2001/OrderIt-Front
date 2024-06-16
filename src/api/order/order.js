import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/orders";

// Create an Axios instance with withCredentials set to true
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // This ensures cookies are sent with requests
});

const getAllOrders = async () => {
    const response = await axiosInstance.get(`/allOrders`);
    console.log("get all ", response.data);
    return response.data;
}

const placeOrder = async (dishId) => {
    const response = await axiosInstance.post(`/placeOrder/${dishId}`);
    return response.data;
}

const updateOrderStatus = async (orderId, status) => {
    const response = await axiosInstance.patch(`/s/${orderId}`, { status });
    return response.data;
}

const deleteOrder = async (orderId) => {
    const response = await axiosInstance.delete(`/d/${orderId}`);
    return response.data;
}

const ordersApi = {
    getAllOrders,
    placeOrder,
    updateOrderStatus,
    deleteOrder
}

export default ordersApi;