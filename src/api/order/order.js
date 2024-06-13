import axios from "axios";

const API_URL = "http;//localhost:8000/api/v1/orders";

const getAllOrders = async () => {
    const response = axios.get(`${API_URL}/allOrders`);
    return response.data;
}

const placeOrder = async (dishId) => {
    const response = await axios.post(`${API_URL}/placeOrder`, {dishId});
    return response.data
}

const updateOrderStatus = async (orderId, status) => {
    const response = await axios.patch(`${API_URL}/changeStatus/${orderId}`, {status});
    return response.data;
}

const ordersApi = {
    getAllOrders,
    placeOrder,
    updateOrderStatus
}

export default ordersApi;