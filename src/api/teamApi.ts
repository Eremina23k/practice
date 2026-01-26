import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getTeams = async () => {
  const response = await axios.get(`${API_URL}/team/`);
  return response.data;
};

export const getTeam = async (id: number) => {
  const response = await axios.get(`${API_URL}/team/${id}`);
  return response.data;
};

export const createTeam = async (data: any) => {
  const response = await axios.post(`${API_URL}/team/`, data);
  return response.data;
};

export const updateTeam = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/team/${id}`, data);
  return response.data;
};


export const deleteTeam = async (id: number) => {
  const response = await axios.delete(`${API_URL}/team/${id}`);
  return response.data;
}; 