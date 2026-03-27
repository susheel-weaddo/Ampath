import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://ampath.com/api/',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
