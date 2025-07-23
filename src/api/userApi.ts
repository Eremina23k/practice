import axios from 'axios';

const API_URL = 'http://localhost:8000/users';

export const registerUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/`, data);
  return response.data;
};

export const getUser = async (id: number, token?: string) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateUser = async (id: number, data: any, token?: string) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const deleteUser = async (id: number, token?: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
}; 