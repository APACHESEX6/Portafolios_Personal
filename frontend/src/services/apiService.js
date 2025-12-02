import api from './api';

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  updateProfile: async (data) => {
    const response = await api.put('/profile', data);
    return response.data;
  },
  
  createProfile: async (data) => {
    const response = await api.post('/profile', data);
    return response.data;
  },
};

export const educationService = {
  getAll: async () => {
    const response = await api.get('/education');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/education/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/education', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/education/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/education/${id}`);
    return response.data;
  },
};

export const experienceService = {
  getAll: async () => {
    const response = await api.get('/experience');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/experience/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/experience', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/experience/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/experience/${id}`);
    return response.data;
  },
};

export const skillService = {
  getAll: async () => {
    const response = await api.get('/skills');
    return response.data;
  },
  
  getByCategory: async (category) => {
    const response = await api.get(`/skills/category/${category}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/skills', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/skills/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },
};

export const contactService = {
  sendMessage: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  },
  
  getAllMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  },
  
  markAsRead: async (id) => {
    const response = await api.patch(`/contact/${id}/read`);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};
