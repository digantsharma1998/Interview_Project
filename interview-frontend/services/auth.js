import axios from "axios";
let fs;
if(typeof window === "undefined") {
    fs = require("fs");
}

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    return response.data;
};

export const logoutUser = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
