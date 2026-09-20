import { APP_CONFIG } from '../config/appConfig';
import { MOCK_DATABASE } from './mockData';

class ApiClient {
  constructor(baseURL = '/api/v1') {
    this.baseURL = baseURL;
  }

  async get(endpoint, delayMs = 400) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate HTTP response
        if (MOCK_DATABASE) {
          resolve({ status: 200, data: MOCK_DATABASE });
        } else {
          reject(new Error('Network error: Unable to connect to Eagle Arena API server.'));
        }
      }, delayMs);
    });
  }

  async post(endpoint, payload, delayMs = 600) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!payload || !payload.fullName || !payload.email) {
          reject(new Error('400 Bad Request: Missing mandatory registration parameters.'));
          return;
        }
        
        const generatedRef = `${APP_CONFIG.prefix}-` + Math.floor(100000 + Math.random() * 900000);
        resolve({
          status: 201,
          data: {
            success: true,
            refId: generatedRef,
            message: 'Day Pass successfully registered.',
            registeredAt: new Date().toISOString()
          }
        });
      }, delayMs);
    });
  }
}

export const apiClient = new ApiClient();
