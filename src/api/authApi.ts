import axios from 'axios';

export const loginUser = async (login: string, password: string) => {
  const response = await axios.post('http://localhost:8000/auth/login', { login, password });
  return response.data; // ожидается { token, role }
}; 