import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
});

// Add a request interceptor to include auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;