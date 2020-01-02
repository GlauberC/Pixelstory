import axios from 'axios';

const api = axios.create({
  baseURL: 'http://177.89.36.87:4049',
});

export default api;
