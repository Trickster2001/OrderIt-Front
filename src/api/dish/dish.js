import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/dish";

const getAllDishes = async () => {
    const response = await axios.get(`${API_URL}/getAllDishes`);
    return response.data;
}

const getOneDish = async (dishId) => {
    const response = await axios.get(`${API_URL}/getOneDish/${dishId}`);
    return response.data;
}

const addDish = async (dishData) => {
    const response = await axios.post(`${API_URL}/addDish`, dishData);
    return response.data;
}

const updateDish = async (dishId, dishData) => {
    const response = await axios.patch(`${API_URL}/updateDish/${dishId}`, dishData);
    return response.data;
}

const deleteDish = async (dishId) => {
    const response = await axios.delete(`${API_URL}/deleteDish/${dishId}`);
    return response.data;
}

const dishApi = {
    getAllDishes,
    getOneDish,
    addDish,
    updateDish,
    deleteDish
}

export default dishApi;