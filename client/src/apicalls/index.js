// For creating instance of axios

import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",//server port
    headers: {
        withCredentials: true,
        "Content-Type": "application/json",
    }
})