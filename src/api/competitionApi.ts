import axios from 'axios';

const API_URL = 'http://localhost:8000'; // адрес backend

export const getCompetitions = async () => {
  const response = await axios.get(`${API_URL}/competition/`);
  return response.data;
};

export const getCompetition = async (id: number) => {
  const response = await axios.get(`${API_URL}/competition/${id}`);
  return response.data;
};

export const createCompetition = async (data: { date: string }) => {
  const response = await axios.post(`${API_URL}/competition/`, data);
  return response.data;
};

export const updateCompetition = async (id: number, data: { date: string }) => {
  const response = await axios.put(`${API_URL}/competition/${id}`, data);
  return response.data;
};

export const deleteCompetition = async (id: number) => {
  const response = await axios.delete(`${API_URL}/competition/${id}`);
  return response.data;
}; 