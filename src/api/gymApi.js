import { apiClient } from './apiClient';

export const gymApi = {
  async fetchAllGymData() {
    const response = await apiClient.get('/arena-data');
    return response.data;
  },

  async registerDayPass(memberData) {
    const response = await apiClient.post('/passes/register', memberData);
    return response.data;
  }
};
