import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Filter from "../components/Filter";
import '../styles/Table.css';
import '../styles/Filter.css';

function StoryManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState({ category: '', status: '' });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    fetch('https://storykuu-production.up.railway.app/api/stories')
      .then(res => res.json())
      .then(data => {
        setStories(data);
      })
      .catch(err => {
        console.error('Error fetching stories:', err);
        setStories([]);
      });
  }, []);

  const filteredStories = stories.filter((story) => {
    const matchSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.writer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory = activeFilter.category === '' || story.category === activeFilter.category;
    const matchStatus = activeFilter.status === '' || story.status === activeFilter.status;

    return matchSearch && matchCategory && matchStatus;
  });

  // Fungsi delete story
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(`https://storykuu-production.up.railway.app/api/stories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStories(stories.filter((story) => story.id !== id));
        alert("Story deleted successfully");
      } else {
        alert("Failed to delete story");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting story");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-1" style={{
        overflowY: 'auto',
        transition: 'padding-left 0.3s ease',
        paddingLeft: sidebarOpen ? '200px' : '0px',  // perbaikan paddingLeft
        flexGrow: 1,
        padding: '2rem',
        width: '100%'
      }}>
        <h1 className="text-lg font-semibold mb-6">Stories</h1>

        <div className="main-header">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by Writers / Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="action-buttons">
            <button
              className="filter-btn"
              aria-label="Filter stories"
              onClick={() => setShowFilter(true)}
            >
              <i className="fas fa-filter"></i>
            </button>
            <button
              className="add-story-btn"
              onClick={() => navigate('/add-story')}
            >
              + Add Story
            </button>
          </div>
        </div>
        <div className="story-form">
          <div className="overflow-x-auto">
            <table className="story-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Writers</th>
                  <th>Category</th>
                  <th>Keyword</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStories.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>No stories found.</td>
                  </tr>
                ) : (
                  filteredStories.map((story, index) => (
                    <tr key={story.id}>
                      <td>{index + 1}</td>
                      <td>{story.title}</td>
                      <td>{story.writer}</td>
                      <td>{story.category}</td>
                      <td>
                        {story.keyword && story.keyword.map((tag, i) => (
                          <span className="tag" key={i}>{tag}</span>
                        ))}
                      </td>
                      <td>
                        <span className={story.status === "Draft" ? "status-draft" : "status-published"}>
                          {story.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/add-story/${story.id}`)}
                          aria-label={`Edit story ${story.title}`}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(story.id)}
                          aria-label={`Delete story ${story.title}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          Menampilkan {filteredStories.length} dari {stories.length} data
        </p>

        <nav className="pagination" aria-label="Pagination">
          <button>&lt;</button>
          <button className="active">1</button>
          <button>&gt;</button>
        </nav>

        {showFilter && (
          <Filter
            onClose={() => setShowFilter(false)}
            onApply={(filterValues) => {
              setActiveFilter(filterValues);
              setShowFilter(false);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default StoryManagement;
