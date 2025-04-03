import axios from "axios";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (username, password) => {
    return await axiosInstance.post("/auth/login", { username, password });
};

export const getProducts = async () => {
    return await axiosInstance.get("/products");
};

export const addProduct = async (productData) => {
    return await axiosInstance.post("/products", productData);
};

export const updateProduct = async (id, productData) => {
    return await axiosInstance.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
    return await axiosInstance.delete(`/products/${id}`);
};