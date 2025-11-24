import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const AdminPanel = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    youtubeLink: '',
    category: '',
    thumbnail: ''
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
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'viewer'
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: '',
    subtitle: '',
    duration: '',
    features: [''],
    description: '',
    mostPopular: false
  });
  const [editingPackage, setEditingPackage] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkLinks, setBulkLinks] = useState('');
  const [bulkCategory, setBulkCategory] = useState('gaming');

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
    
    // Load contacts from backend API
    const loadContacts = async () => {
      try {
        const data = await ApiService.getContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to load contacts:', error);
        setContacts([]);
      }
    };
    
    // Load users from backend API
    const loadUsers = async () => {
      try {
        const data = await ApiService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
        setUsers([]);
      }
    };
    
    if (activeTab === 'portfolio') {
      loadProjects();
    } else if (activeTab === 'reviews') {
      loadReviews();
    } else if (activeTab === 'messages') {
      loadContacts();
    } else if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'packages') {
      const savedPackages = localStorage.getItem('packages');
      if (savedPackages) {
        setPackages(JSON.parse(savedPackages));
      } else {
        const defaultPackages = [
          {
            id: 1,
            title: "Reels & Shorts",
            duration: "Up to 60 seconds",
            features: [
              "Snappy cuts + on-beat pacing",
              "Dynamic captions & trendy effects",
              "Basic color grade + sound polish",
              "2 revision rounds",
              "Default Raw file export"
            ],
            description: "Perfect for creators who want scroll-stopping short-form edits."
          },
          {
            id: 2,
            title: "Long Format",
            subtitle: "(YouTube / Interviews / Podcasts)",
            duration: "Up to 10–15 minutes",
            features: [
              "Multi-cam sync & clean transitions",
              "Color correction & light grading",
              "Audio cleanup + background music",
              "2–3 revisions",
              "Thumbnail included (optional)"
            ],
            description: "For creators who want polished storytelling that holds attention."
          },
          {
            id: 3,
            title: "Motion Graphics / Explainers",
            features: [
              "Logo animations / lower thirds / infographics",
              "Text animations & visual effects",
              "Sound design + music sync",
              "2–3 revisions",
              "4K export quality"
            ],
            description: "Ideal for brands and creators who want their visuals to pop."
          }
        ];
        setPackages(defaultPackages);
        localStorage.setItem('packages', JSON.stringify(defaultPackages));
      }
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
    
    // Load works from backend API
    const loadWorks = async () => {
      try {
        const data = await ApiService.getWorks();
        setWorks(data);
      } catch (error) {
        console.error('Failed to load works:', error);
        setWorks([]);
      }
    };
    
    if (activeTab === 'otherwork') {
      loadWorks();
    }
  }, [activeTab]);

  // Load current user on component mount and verify access
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user.role === 'admin' || user.role === 'editor') {
          setCurrentUser(user);
        } else {
          // Unauthorized access - redirect to home
          window.location.hash = '';
          window.location.reload();
        }
      } catch (error) {
        console.error('Failed to parse user data');
        window.location.hash = '';
        window.location.reload();
      }
    } else {
      // No user logged in - redirect to home
      window.location.hash = '';
      window.location.reload();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    if (onLogout) onLogout();
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

  const addWork = async (e) => {
    e.preventDefault();
    try {
      const workData = {
        ...newWork,
        image: newWork.image ? convertGoogleDriveUrl(newWork.image) : `https://via.placeholder.com/400x225/4CAF50/white?text=${encodeURIComponent(newWork.title)}`
      };
      
      const savedWork = await ApiService.createWork(workData);
      setWorks([...works, savedWork]);
      setNewWork({ title: '', description: '', category: '', stats: '', image: null });
      alert('Work added successfully!');
    } catch (error) {
      console.error('Failed to add work:', error);
      alert('Failed to add work. Please try again.');
    }
  };

  const convertGoogleDriveUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      // Handle /file/d/ format
      let fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      // Handle /open?id= format
      if (!fileId) fileId = url.match(/[?&]id=([a-zA-Z0-9-_]+)/)?.[1];
      // Handle /uc?id= format
      if (!fileId) fileId = url.match(/\/uc\?.*id=([a-zA-Z0-9-_]+)/)?.[1];
      
      if (fileId) {
        // Try different Google Drive endpoints for better compatibility
        return `https://lh3.googleusercontent.com/d/${fileId}=w1000-h600-no`;
      }
    }
    
    // Handle Imgur URLs
    if (url.includes('imgur.com')) {
      // Convert imgur gallery to direct image
      if (url.includes('/gallery/') || url.includes('/a/')) {
        const imgId = url.match(/\/(gallery|a)\/([a-zA-Z0-9]+)/)?.[2];
        return imgId ? `https://i.imgur.com/${imgId}.jpg` : url;
      }
      // Ensure direct imgur link
      if (!url.includes('i.imgur.com')) {
        const imgId = url.match(/imgur\.com\/([a-zA-Z0-9]+)/)?.[1];
        return imgId ? `https://i.imgur.com/${imgId}.jpg` : url;
      }
    }
    
    // Handle Dropbox URLs
    if (url.includes('dropbox.com')) {
      return url.replace('?dl=0', '?raw=1');
    }
    
    // Handle OneDrive URLs
    if (url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
      return url.replace('/view?', '/download?');
    }
    
    // Return original URL if no conversion needed
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

  const addPackage = (e) => {
    e.preventDefault();
    const pkg = {
      id: Date.now(),
      ...newPackage,
      features: newPackage.features.filter(f => f.trim() !== '')
    };
    const updatedPackages = [...packages, pkg];
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    setNewPackage({ title: '', subtitle: '', duration: '', features: [''], description: '', mostPopular: false });
    alert('Package added successfully!');
  };

  const editPackage = (pkg) => {
    setEditingPackage(pkg);
    setNewPackage({
      title: pkg.title,
      subtitle: pkg.subtitle || '',
      duration: pkg.duration || '',
      features: [...pkg.features],
      description: pkg.description,
      mostPopular: pkg.mostPopular || false
    });
  };

  const updatePackage = (e) => {
    e.preventDefault();
    const updatedPkg = {
      ...editingPackage,
      ...newPackage,
      features: newPackage.features.filter(f => f.trim() !== '')
    };
    const updatedPackages = packages.map(p => p.id === editingPackage.id ? updatedPkg : p);
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    setEditingPackage(null);
    setNewPackage({ title: '', subtitle: '', duration: '', features: [''], description: '', mostPopular: false });
    alert('Package updated successfully!');
  };

  const deletePackage = (id) => {
    const updatedPackages = packages.filter(p => p.id !== id);
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    alert('Package deleted successfully!');
  };

  const addFeature = () => {
    setNewPackage({ ...newPackage, features: [...newPackage.features, ''] });
  };

  const updateFeature = (index, value) => {
    const updatedFeatures = [...newPackage.features];
    updatedFeatures[index] = value;
    setNewPackage({ ...newPackage, features: updatedFeatures });
  };

  const removeFeature = (index) => {
    const updatedFeatures = newPackage.features.filter((_, i) => i !== index);
    setNewPackage({ ...newPackage, features: updatedFeatures });
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

  const deleteWork = async (workId) => {
    try {
      await ApiService.deleteWork(workId);
      const updatedWorks = works.filter(w => w._id !== workId);
      setWorks(updatedWorks);
      alert('Work deleted successfully!');
    } catch (error) {
      console.error('Failed to delete work:', error);
      alert('Failed to delete work. Please try again.');
    }
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

  const updateWork = async (e) => {
    e.preventDefault();
    try {
      const workData = {
        ...newWork,
        image: newWork.image ? convertGoogleDriveUrl(newWork.image) : editingWork.image
      };
      
      const updatedWork = await ApiService.updateWork(editingWork._id, workData);
      const updatedWorks = works.map(w => 
        w._id === editingWork._id ? updatedWork : w
      );
      setWorks(updatedWorks);
      setEditingWork(null);
      setNewWork({ title: '', description: '', category: '', stats: '', image: null });
      alert('Work updated successfully!');
    } catch (error) {
      console.error('Failed to update work:', error);
      alert('Failed to update work. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingWork(null);
    setNewWork({ title: '', description: '', category: '', stats: '', image: null });
  };

  const markContactSeen = async (contactId) => {
    try {
      await ApiService.markContactSeen(contactId);
      const updatedContacts = contacts.map(c => 
        c._id === contactId ? { ...c, seen: true } : c
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Failed to mark contact as seen:', error);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      await ApiService.deleteContact(contactId);
      const updatedContacts = contacts.filter(c => c._id !== contactId);
      setContacts(updatedContacts);
      alert('Contact deleted successfully!');
    } catch (error) {
      console.error('Failed to delete contact:', error);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createUser(newUser);
      setNewUser({ username: '', email: '', password: '', role: 'viewer' });
      // Reload users after adding
      const data = await ApiService.getUsers();
      setUsers(data);
      alert('User created successfully!');
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  const deleteUser = async (userId) => {
    try {
      await ApiService.deleteUser(userId);
      const updatedUsers = users.filter(u => u._id !== userId);
      setUsers(updatedUsers);
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleBulkUpload = async () => {
    const links = bulkLinks.split('\n').filter(link => link.trim());
    let successCount = 0;
    
    for (const link of links) {
      const fileIdMatch = link.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        const convertedLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
        
        try {
          await ApiService.createProject({
            title: `Video ${successCount + 1}`,
            description: 'Uploaded via bulk upload',
            youtubeLink: convertedLink,
            category: bulkCategory
          });
          successCount++;
        } catch (error) {
          console.error('Failed to upload:', error);
        }
      }
    }
    
    alert(`Successfully uploaded ${successCount} videos!`);
    setBulkLinks('');
    setShowBulkUpload(false);
    
    // Reload projects
    const data = await ApiService.getProjects();
    setProjects(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Site</span>
            </button>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser && (
              <div className="text-white">
                <span className="text-gray-400">Welcome, </span>
                <span className="font-semibold">{currentUser.username}</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  currentUser.role === 'admin' ? 'bg-red-600' : 
                  currentUser.role === 'editor' ? 'bg-blue-600' : 'bg-gray-600'
                } text-white`}>
                  {currentUser.role?.toUpperCase()}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
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
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded relative ${activeTab === 'messages' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Messages
            {contacts.filter(c => !c.seen).length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                <span className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 rounded ${activeTab === 'packages' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Packages
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded ${activeTab === 'users' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Users
            </button>
          )}
        </div>
        
        {activeTab === 'portfolio' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            {!editingProject && (
              <button
                onClick={() => setShowBulkUpload(!showBulkUpload)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                {showBulkUpload ? 'Single Upload' : 'Bulk Upload'}
              </button>
            )}
          </div>
          
          {showBulkUpload && !editingProject ? (
            <div className="space-y-4">
              <textarea
                placeholder="Paste Google Drive links here (one per line):&#10;https://drive.google.com/file/d/FILE_ID1/view?usp=sharing&#10;https://drive.google.com/file/d/FILE_ID2/view?usp=sharing"
                value={bulkLinks}
                onChange={(e) => setBulkLinks(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded h-32"
              />
              <select
                value={bulkCategory}
                onChange={(e) => setBulkCategory(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded"
              >
                <option value="gaming">Gaming</option>
                <option value="education">Education</option>
                <option value="motion">Motion Graphics</option>
                <option value="3d">3D Animation</option>
              </select>
              <button
                onClick={handleBulkUpload}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Process Bulk Upload
              </button>
            </div>
          ) : (
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
            <div>
              <label className="block text-white mb-2">Video URL</label>
              <input
                type="url"
                placeholder="YouTube, Google Drive, or direct video URL"
                value={newProject.youtubeLink}
                onChange={(e) => setNewProject({...newProject, youtubeLink: e.target.value})}
                className="w-full p-3 bg-gray-700 text-white rounded"
                required
              />
              <div className="text-gray-400 text-xs mt-1 space-y-1">
                <p>• YouTube: Copy video URL</p>
                <p>• Google Drive: Share video → Copy link → Make public</p>
                <p>• Direct: .mp4, .mov, .avi links</p>
              </div>
            </div>
            <div>
              <label className="block text-white mb-2">Custom Thumbnail {newProject.youtubeLink.includes('drive.google.com') ? '(Required for Google Drive)' : '(Optional)'}</label>
              <input
                type="url"
                placeholder="Thumbnail image URL (screenshot of your video)"
                value={newProject.thumbnail}
                onChange={(e) => setNewProject({...newProject, thumbnail: e.target.value})}
                className="w-full p-3 bg-gray-700 text-white rounded"
              />
              <div className="text-gray-400 text-xs mt-1 space-y-1">
                <p>• YouTube: Auto-generated (optional override)</p>
                <p>• Google Drive: Required - take screenshot of video</p>
                <p>• Upload screenshot to Google Drive/Imgur and paste link</p>
              </div>
              {newProject.thumbnail && (
                <img src={newProject.thumbnail} alt="Thumbnail preview" className="mt-2 w-32 h-20 object-cover rounded" onError={(e) => e.target.style.display = 'none'} />
              )}
            </div>
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
          )}
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
              <label className="block text-white mb-2">Image/Video Upload Options</label>
              
              {/* File Upload */}
              <div className="mb-3">
                <label className="block text-gray-300 text-sm mb-1">1. Upload File (Recommended)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setNewWork({...newWork, image: e.target.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-2 bg-gray-700 text-white rounded text-sm"
                />
                <p className="text-gray-400 text-xs mt-1">Upload directly from your computer (images/videos)</p>
              </div>
              
              {/* URL Input */}
              <div className="mb-3">
                <label className="block text-gray-300 text-sm mb-1">2. Or Paste URL</label>
                <input
                  type="url"
                  placeholder="Google Drive, Imgur, or direct image URL"
                  value={typeof newWork.image === 'string' && !newWork.image.startsWith('data:') ? newWork.image : ''}
                  onChange={(e) => setNewWork({...newWork, image: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded"
                />
                <div className="text-gray-400 text-xs mt-1 space-y-1">
                  <p>• Google Drive: Share → Copy link → Make public</p>
                  <p>• Imgur: Upload → Copy direct link</p>
                  <p>• Direct URLs: .jpg, .png, .gif, .mp4 links</p>
                </div>
              </div>
              
              {/* Preview */}
              {newWork.image && (
                <div className="mt-3">
                  <label className="block text-gray-300 text-sm mb-1">Preview:</label>
                  {newWork.image.startsWith('data:') ? (
                    <img src={newWork.image} alt="Preview" className="w-32 h-20 object-cover rounded" />
                  ) : (
                    <img 
                      src={convertGoogleDriveUrl(newWork.image)} 
                      alt="Preview" 
                      className="w-32 h-20 object-cover rounded" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.log('Image failed to load:', newWork.image);
                      }} 
                    />
                  )}
                </div>
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
        
        {activeTab === 'messages' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Contact Messages</h2>
            <span className="text-sm text-gray-400">
              {contacts.filter(c => !c.seen).length} unread messages
            </span>
          </div>
          {contacts.length === 0 ? (
            <p className="text-gray-400">No messages received yet.</p>
          ) : (
            <div className="space-y-4">
              {contacts.map(contact => (
                <div key={contact._id} className={`p-4 rounded border-l-4 ${
                  contact.seen ? 'bg-gray-700 border-gray-500' : 'bg-gray-600 border-blue-500'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{contact.name}</h3>
                        {!contact.seen && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">NEW</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-gray-400 text-sm">{contact.phone}</p>
                      )}
                      <p className="text-gray-300 font-medium mt-2">{contact.subject}</p>
                      <p className="text-gray-300 text-sm mt-2">{contact.message}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!contact.seen && (
                        <button
                          onClick={() => markContactSeen(contact._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
        
        {activeTab === 'users' && currentUser?.role === 'admin' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add New User</h2>
          <form onSubmit={addUser} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({...newUser, username: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded hover:bg-secondary"
            >
              Add User
            </button>
          </form>
        </div>
        )}
        
        {activeTab === 'packages' && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingPackage ? 'Edit Package' : 'Add New Package'}
          </h2>
          <form onSubmit={editingPackage ? updatePackage : addPackage} className="space-y-4">
            <input
              type="text"
              placeholder="Package Title"
              value={newPackage.title}
              onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              required
            />
            <input
              type="text"
              placeholder="Subtitle (optional)"
              value={newPackage.subtitle}
              onChange={(e) => setNewPackage({...newPackage, subtitle: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
            />

            <input
              type="text"
              placeholder="Duration (optional)"
              value={newPackage.duration}
              onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
            />
            
            <div>
              <label className="block text-white mb-2">Features</label>
              {newPackage.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Feature description"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 p-2 bg-gray-700 text-white rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Add Feature
              </button>
            </div>
            
            <textarea
              placeholder="Package Description"
              value={newPackage.description}
              onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
              className="w-full p-3 bg-gray-700 text-white rounded"
              rows="3"
              required
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="mostPopular"
                checked={newPackage.mostPopular}
                onChange={(e) => setNewPackage({...newPackage, mostPopular: e.target.checked})}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="mostPopular" className="text-white text-sm">
                Mark as Most Popular
              </label>
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded hover:bg-secondary"
              >
                {editingPackage ? 'Update Package' : 'Add Package'}
              </button>
              {editingPackage && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingPackage(null);
                    setNewPackage({ title: '', subtitle: '', duration: '', features: [''], description: '', mostPopular: false });
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        )}
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            {activeTab === 'portfolio' ? 'Manage Projects' : 
             activeTab === 'otherwork' ? 'Manage Works' : 
             activeTab === 'packages' ? 'Manage Packages' : 'Manage Reviews'}
          </h2>
          {activeTab === 'users' && currentUser?.role === 'admin' && (
            users.length === 0 ? (
              <p className="text-gray-400">No users created yet.</p>
            ) : (
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user._id} className="bg-gray-700 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{user.username}</h3>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                          user.role === 'admin' ? 'bg-red-600' : 
                          user.role === 'editor' ? 'bg-blue-600' : 'bg-gray-600'
                        } text-white`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
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
                  <div key={work._id || work.id} className="bg-gray-700 p-4 rounded">
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
                          onClick={() => deleteWork(work._id || work.id)}
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
                ))
              </div>
            )
          )}
          {activeTab === 'packages' && (
            packages.length === 0 ? (
              <p className="text-gray-400">No packages added yet.</p>
            ) : (
              <div className="space-y-4">
                {packages.map(pkg => (
                  <div key={pkg.id} className="bg-gray-700 p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{pkg.title}</h3>
                        {pkg.subtitle && (
                          <p className="text-gray-400 text-sm">{pkg.subtitle}</p>
                        )}
                        {pkg.duration && (
                          <p className="text-gray-400 text-sm">{pkg.duration}</p>
                        )}
                        <p className="text-gray-300 text-sm mt-1">{pkg.description}</p>
                        <div className="mt-2">
                          <p className="text-gray-400 text-xs mb-1">Features:</p>
                          <ul className="text-gray-300 text-xs space-y-1">
                            {pkg.features.map((feature, i) => (
                              <li key={i}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => editPackage(pkg)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePackage(pkg.id)}
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
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;