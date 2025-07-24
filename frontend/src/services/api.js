import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (username, email, password) => api.post('/auth/signup', { username, email, password }),
};

export const booksAPI = {
  getBooks: (params) => api.get('/books', { params }),
  getBook: (id) => api.get(`/books/${id}`),
  addBook: (bookData) => api.post('/books', bookData),
  getGenres: () => api.get('/books/genres'),
  getAuthors: () => api.get('/books/authors'),
};

export const reviewsAPI = {
  getReviews: (bookId, params) => api.get(`/reviews/book/${bookId}`, { params }),
  addReview: (reviewData) => api.post('/reviews', reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export default api;
