import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatApi = {
  getConversations: () => api.get('/conversations'),
  createConversation: (data) => api.post('/conversations', data),
  sendMessage: (data) => api.post('/messages', data)
};

export default api;