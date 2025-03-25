import axios from 'axios';
const baseURL = 'https://mern-blog-backend-lhfx.onrender.com' // Production URL      

// Create an axios instance to apply the base URL globally
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Allow cookies to be sent with requests
});

// Add token to requests (if a token exists in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define all API methods here
export const getPosts = () => api.get('/post'); 
export const getPost = (id) => api.get(`/post/${id}`); 

//CREATING and UPDATING POST (CHANGE THIS IF NEEDED)
export const createPost = (data) => api.post('/post', data); 
export const updatePost = (id, data) => api.put(`/post/${id}`, data); 
//export const deletePost = (id) => api.delete(`/post/${id}`);

export const getUserProfile = () => api.get('/profile'); 
export const login = (data) => api.post('/login', data);
export const register = (data) => api.post('/register', data);
export const logout = () => api.post('/logout');
