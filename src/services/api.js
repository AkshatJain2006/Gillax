const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Reviews
  async getReviews() {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    return response.json();
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
    const response = await fetch(`${API_BASE_URL}/projects`);
    return response.json();
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
}

export default new ApiService();