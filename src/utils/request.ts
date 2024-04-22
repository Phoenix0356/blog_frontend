import axios from "axios";

const request = axios.create({
    baseURL: "/api",
    'timeout': 60000
})

request.interceptors.request.use((config) => {
    config.headers['authorization'] = localStorage.getItem('token');
    return config;
})

export default request