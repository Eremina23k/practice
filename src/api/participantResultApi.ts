import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getParticipantResults = async () => {
  const response = await axios.get(`${API_URL}/participantResult/`);
  return response.data;
};

export const getParticipantResult = async (id: number) => {
  const response = await axios.get(`${API_URL}/participantResult/${id}`);
  return response.data;
};

export const createParticipantResult = async (data: any) => {
  const response = await axios.post(`${API_URL}/participantResult/`, data);
  return response.data;
};

export const updateParticipantResult = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/participantResult/${id}`, data);
  return response.data;
};

export const deleteParticipantResult = async (id: number) => {
  const response = await axios.delete(`${API_URL}/participantResult/${id}`);
  return response.data;
}; 