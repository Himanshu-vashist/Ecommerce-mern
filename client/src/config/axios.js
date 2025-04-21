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

// Add a response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is due to an ad blocker
    if (!error.response && error.message === 'Network Error') {
      console.warn('Possible ad blocker interference detected');
      // You could add custom handling here
      error.isAdBlockerError = true;
    }
    return Promise.reject(error);
  }
);

export default instance;