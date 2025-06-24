import axios from 'axios';

const API = axios.create({ baseURL: "https://mutual-fund-tracker-00mp.onrender.com/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const register = (data) => API.post('/users/register', data);
export const login = (data) => API.post('/users/login', data);
export const saveFund = (data) => API.post('/funds/save', data);
export const getSavedFunds = () => API.get('/funds/saved');
export const removeFund = (fundCode) => API.delete(`/funds/remove/${fundCode}`);
