const BASE_URL = 'https://jsonplaceholder.typicode.com';

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const userAPI = {
  async getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    
    if (!response.ok) {
      throw new APIError('Failed to fetch users', response.status);
    }
    
    return response.json();
  },

  async getUser(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new APIError('Failed to fetch user', response.status);
    }
    
    return response.json();
  },

  async createUser(userData) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new APIError('Failed to create user', response.status);
    }
    
    return response.json();
  },

  async updateUser(id, userData) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new APIError('Failed to update user', response.status);
    }
    
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new APIError('Failed to delete user', response.status);
    }
    
    return response.json();
  }
};