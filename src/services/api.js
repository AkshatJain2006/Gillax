const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Reviews
  async getReviews() {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  }

  async getAllReviews() {
    const response = await fetch(`${API_BASE_URL}/reviews/admin`);
    return response.json();
  }

  async createReview(reviewData) {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    return response.json();
  }

  async deleteReview(id) {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // Projects
  async getProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  }

  async createProject(projectData) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    return response.json();
  }

  async deleteProject(id) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // Contacts
  async getContacts() {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  }

  async createContact(contactData) {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return response.json();
  }

  async markContactSeen(id) {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}/seen`, {
      method: 'PATCH'
    });
    return response.json();
  }

  async deleteContact(id) {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // Users
  async loginUser(credentials) {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  }

  async getUsers() {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }

  async createUser(userData) {
    const token = localStorage.getItem('adminToken');
    const headers = { 'Content-Type': 'application/json' };
    
    // Add auth header only if token exists (for admin creating users)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async deleteUser(id) {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
}

export default new ApiService();