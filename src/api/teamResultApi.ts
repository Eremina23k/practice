import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getTeamResults = async () => {
  const response = await axios.get(`${API_URL}/teamResult/`);
  return response.data;
};

export const getTeamResult = async (id: number) => {
  const response = await axios.get(`${API_URL}/teamResult/${id}`);
  return response.data;
};

export const createTeamResult = async (data: any) => {
  const response = await axios.post(`${API_URL}/teamResult/`, data);
  return response.data;
};

export const updateTeamResult = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/teamResult/${id}`, data);
  return response.data;
};

export const deleteTeamResult = async (id: number) => {
  const response = await axios.delete(`${API_URL}/teamResult/${id}`);
  return response.data;
}; 