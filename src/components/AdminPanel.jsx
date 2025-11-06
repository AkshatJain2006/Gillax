import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    youtubeLink: '',
    category: ''
  });
  const [editingProject, setEditingProject] = useState(null);
  const [newWork, setNewWork] = useState({
    title: '',
    description: '',
    category: '',
    stats: '',
    image: null
  });
  const [activeTab, setActiveTab] = useState('portfolio');
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [works, setWorks] = useState([]);
  const [editingWork, setEditingWork] = useState(null);

  useEffect(() => {
    // Load projects from backend API
    const loadProjects = async () => {
      try {
        const data = await ApiService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      }
    };
    
    // Load reviews from backend API
    const loadReviews = async () => {
      try {
        const data = await ApiService.getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews:', error);
        setReviews([]);
      }
    };
    
    if (activeTab === 'portfolio') {
      loadProjects();
    } else if (activeTab === 'reviews') {
      loadReviews();
    }
    
    // Load categories from localStorage
    const savedCategories = localStorage.getItem('workCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      const defaultCategories = ['gaming', 'education', 'branding', 'music', 'commercial', 'social'];
      setCategories(defaultCategories);
      localStorage.setItem('workCategories', JSON.stringify(defaultCategories));
    }
    
    // Load works from localStorage
    if (activeTab === 'otherwork') {
      const savedWorks = localStorage.getItem('otherWorks');
      if (savedWorks) {
        setWorks(JSON.parse(savedWorks));
      }
    }
  }, [activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'gillax2024') {
      setIsAdmin(true);
    } else {
      alert('Invalid password');
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      const savedProject = await ApiService.createProject(newProject);
      setProjects([...projects, savedProject]);
      setNewProject({ title: '', description: '', youtubeLink: '', category: '' });
      alert('Project added successfully!');
    } catch (error) {
      console.error('Failed to add project:', error);
      alert('Failed to add project. Please try again.');
    }
  };

  const addWork = (e) => {
    e.preventDefault();
    const work = {
      id: Date.now(),
      ...newWork,
      date: new Date().toISOString(),
      image: newWork.image ? convertGoogleDriveUrl(newWork.image) : `https://via.placeholder.com/400x225/4CAF50/white?text=${encodeURIComponent(newWork.title)}`
    };
    
    const existingWorks = JSON.parse(localStorage.getItem('otherWorks') || '[]');
    const updatedWorks = [...existingWorks, work];
    setWorks(updatedWorks);
    localStorage.setItem('otherWorks', JSON.stringify(updatedWorks));
    
    setNewWork({ title: '', description: '', category: '', stats: '', image: null });
    alert('Work added successfully!');
  };

  const convertGoogleDriveUrl = (url) => {
    // Convert Google Drive share URL to direct image URL
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
    }
    return url;
  };

  const editProject = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      youtubeLink: project.youtubeLink,
      category: project.category
    });
  };

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${editingProject._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (response.ok) {
        const updatedProject = await response.json();
        const updatedProjects = projects.map(p => 
          p._id === editingProject._id ? updatedProject : p
        );
        setProjects(updatedProjects);
        setEditingProject(null);
        setNewProject({ title: '', description: '', youtubeLink: '', category: '' });
        alert('Project updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update project:', error);
      alert('Failed to update project. Please try again.');
    }
  };

  const cancelProjectEdit = () => {
    setEditingProject(null);
    setNewProject({ title: '', description: '', youtubeLink: '', category: '' });
  };

  const deleteProject = async (id) => {
    try {
      await ApiService.deleteProject(id);
      const updatedProjects = projects.filter(p => p._id !== id);
      setProjects(updatedProjects);
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const approveReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/approve`, {
        method: 'PATCH'
      });
      if (response.ok) {
        const updatedReviews = reviews.map(r => 
          r._id === reviewId ? { ...r, approved: true } : r
        );
        setReviews(updatedReviews);
        alert('Review approved successfully!');
      }
    } catch (error) {
      console.error('Failed to approve review:', error);
      alert('Failed to approve review. Please try again.');
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await ApiService.deleteReview(reviewId);
      const updatedReviews = reviews.filter(r => r._id !== reviewId);
      setReviews(updatedReviews);
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.toLowerCase())) {
      const updatedCategories = [...categories, newCategory.toLowerCase()];
      setCategories(updatedCategories);
      localStorage.setItem('workCategories', JSON.stringify(updatedCategories));
      setNewCategory('');
      alert('Category added successfully!');
    } else {
      alert('Category already exists or is empty!');
    }
  };

  const deleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
    setCategories(updatedCategories);
    localStorage.setItem('workCategories', JSON.stringify(updatedCategories));
    alert('Category deleted successfully!');
  };

  const downloadReviewsJSON = () => {
    const dataStr = JSON.stringify(reviews, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reviews_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteWork = (workId) => {
    const updatedWorks = works.filter(w => w.id !== workId);
    setWorks(updatedWorks);
    localStorage.setItem('otherWorks', JSON.stringify(updatedWorks));
    alert('Work deleted successfully!');
  };

  const editWork = (work) => {
    setEditingWork(work);
    setNewWork({
      title: work.title,
      description: work.description,
      category: work.category,
      stats: work.stats,
      image: work.image
    });
  };

  const updateWork = (e) => {
    e.preventDefault();
    const updatedWork = {
      ...editingWork,
      ...newWork,
      image: newWork.image ? convertGoogleDriveUrl(newWork.image) : editingWork.image
    };
    const updatedWorks = works.map(w => 
      w.id === editingWork.id ? updatedWork : w
    );
    setWorks(updatedWorks);
    localStorage.setItem('otherWorks', JSON.stringify(updatedWorks));
    setEditingWork(null);
    setNewWork({ title: '', description: '', category: '', stats: '', image: null });
    alert('Work updated successfully!');
  };

  const cancelEdit = () => {
    setEditingWork(null);
    setNewWork({ title: '', description: '', category: '', stats: '', image: null });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-white">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded hover:bg-secondary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 rounded ${activeTab === 'portfolio' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('otherwork')}
            className={`px-6 py-3 rounded ${activeTab === 'otherwork' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Other Work
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 rounded ${activeTab === 'reviews' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Reviews
          </button>
        </div>
        
        {activeTab === 'portfolio' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={editingProject ? updateProject : addProject} className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              rows="3"
              required
            />
            <input
              type="url"
              placeholder="YouTube Link"
              value={newProject.youtubeLink}
              onChange={(e) => setNewProject({...newProject, youtubeLink: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <select
              value={newProject.category}
              onChange={(e) => setNewProject({...newProject, category: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="gaming">Gaming</option>
              <option value="education">Education</option>
              <option value="motion">Motion Graphics</option>
              <option value="3d">3D Animation</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded hover:bg-secondary"
              >
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
              {editingProject && (
                <button
                  type="button"
                  onClick={cancelProjectEdit}
                  className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        )}
        
        {activeTab === 'otherwork' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingWork ? 'Edit Work' : 'Add New Work'}
          </h2>
          <form onSubmit={editingWork ? updateWork : addWork} className="space-y-4">
            <input
              type="text"
              placeholder="Work Title"
              value={newWork.title}
              onChange={(e) => setNewWork({...newWork, title: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <textarea
              placeholder="Work Description"
              value={newWork.description}
              onChange={(e) => setNewWork({...newWork, description: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              rows="3"
              required
            />
            <select
              value={newWork.category}
              onChange={(e) => setNewWork({...newWork, category: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            {/* Category Management Section */}
            <div className="mt-4 p-4 bg-gray-600 rounded">
              <h4 className="text-white font-semibold mb-3">Manage Categories</h4>
              
              <form onSubmit={addCategory} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded text-sm"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Add
                </button>
              </form>
              
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                    <span className="text-white capitalize text-sm">{category}</span>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Stats (e.g., 2M+ Views)"
              value={newWork.stats}
              onChange={(e) => setNewWork({...newWork, stats: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <div>
              <label className="block text-white mb-2">Image URL (Google Drive)</label>
              <input
                type="url"
                placeholder="Paste Google Drive image URL here"
                value={newWork.image || ''}
                onChange={(e) => setNewWork({...newWork, image: e.target.value})}
                className="w-full p-3 bg-gray-700 text-white rounded"
              />
              <p className="text-gray-400 text-xs mt-1">
                Upload image to Google Drive → Right click → Get link → Make sure it's public
              </p>
              {newWork.image && (
                <img src={newWork.image} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded" onError={(e) => e.target.style.display = 'none'} />
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded hover:bg-secondary"
              >
                {editingWork ? 'Update Work' : 'Add Work'}
              </button>
              {editingWork && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        )}
        
        {activeTab === 'reviews' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Manage Client Reviews</h2>
            <button
              onClick={downloadReviewsJSON}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Download JSON
            </button>
          </div>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-gray-700 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-semibold">{review.name}</h3>
                      <p className="text-gray-400 text-sm">{review.role} - {review.platform}</p>
                      <div className="flex space-x-1 my-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!review.approved && (
                        <button
                          onClick={() => approveReview(review._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">"{review.review}"</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${review.approved ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {review.approved ? 'Approved' : 'Pending Approval'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            {activeTab === 'portfolio' ? 'Manage Projects' : activeTab === 'otherwork' ? 'Manage Works' : 'Manage Reviews'}
          </h2>
          {activeTab === 'portfolio' && (
            projects.length === 0 ? (
              <p className="text-gray-400">No projects added yet.</p>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project._id} className="bg-gray-700 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{project.title}</h3>
                        <p className="text-gray-400 text-sm capitalize">{project.category}</p>
                        <p className="text-gray-300 text-sm mt-1">{project.description}</p>
                        <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline">
                          View on YouTube
                        </a>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => editProject(project)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(project._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
          {activeTab === 'otherwork' && (
            works.length === 0 ? (
              <p className="text-gray-400">No works added yet.</p>
            ) : (
              <div className="space-y-4">
                {works.map(work => (
                  <div key={work.id} className="bg-gray-700 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{work.title}</h3>
                        <p className="text-gray-400 text-sm capitalize">{work.category} - {work.stats}</p>
                        <p className="text-gray-300 text-sm mt-1">{work.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => editWork(work)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteWork(work.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {work.image && (
                      <img src={work.image} alt={work.title} className="w-20 h-12 object-cover rounded mt-2" />
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;