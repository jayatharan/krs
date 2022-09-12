import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
});

export const setAuthHeader = (authToken) => {
    if (authToken) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
    }
};

export const removeAuthHeader = () => {
    axiosInstance.defaults.headers.common.Authorization = '';
};

export default axiosInstance;