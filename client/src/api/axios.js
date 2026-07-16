// #3

import axios from 'axios';
import { readStoredUser } from '../utils/storage';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const user = readStoredUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
