import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
    },
});

export default api;