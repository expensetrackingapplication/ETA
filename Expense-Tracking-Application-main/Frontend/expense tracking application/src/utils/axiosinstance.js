// --- REPLACE THE ENTIRE CONTENT of src/utils/axiosinstance.js ---

import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    // <<<--- THE FIX: The default 'Content-Type' header has been removed --- >>>
    // The browser will now automatically set the correct header for each request
    // (e.g., 'application/json' for regular data, 'multipart/form-data' for file uploads).
    headers: {
        Accept: "application/json",
    },
});

// Request interceptor (This part is correct)
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (This part is correct)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            if(error.response.status === 401){
                window.location.href = "/login";
            } else if (error.response.status === 500){
                console.error("Server error. Please try again later.");
            } 
        } else if (error.code === "ECONNABORTED"){
                console.error("Request timeout. Please try again.");
         }            
        return Promise.reject(error);
    }
);

export default axiosInstance;