import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getParticipants = async () => {
  const response = await axios.get(`${API_URL}/participant/`);
  return response.data;
};

export const getParticipant = async (id: number) => {
  const response = await axios.get(`${API_URL}/participant/${id}`);
  return response.data;
};

export const createParticipant = async (data: any) => {
  const response = await axios.post(`${API_URL}/participant/`, data);
  return response.data;
};

export const updateParticipant = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/participant/${id}`, data);
  return response.data;
};

export const deleteParticipant = async (id: number) => {
  const response = await axios.delete(`${API_URL}/participant/${id}`);
  return response.data;
}; 