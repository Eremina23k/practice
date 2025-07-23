import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const loginUser = async (login: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { login, password });
  return response.data; // ожидается { token, role }
}; 