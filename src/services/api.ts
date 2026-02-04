import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for Laravel Sanctum
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data: any) => api.post('/register', data),
  login: (data: any) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getCurrentUser: () => api.get('/me'),
};

// Post endpoints
export const postAPI = {
  getAllPosts: (page: number = 1) => api.get(`/posts?page=${page}`),
  getPostBySlug: (slug: string) => api.get(`/posts/${slug}`),
  createPost: (data: any) => api.post('/posts', data),
  updatePost: (id: number, data: any) => api.put(`/posts/${id}`, data),
  deletePost: (id: number) => api.delete(`/posts/${id}`),
  uploadImage: (formData: FormData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Category endpoints
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  createCategory: (data: any) => api.post('/categories', data),
  updateCategory: (id: number, data: any) => api.put(`/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/categories/${id}`),
};

export default api;
