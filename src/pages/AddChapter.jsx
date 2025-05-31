import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AddChapter.css';
import Sidebar from "../components/Sidebar";
import TipTapEditor from "../components/TipTapEditor";

function AddChapter() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const navigate = useNavigate();
    const { chapterId } = useParams();

    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isEditMode = !!chapterId;

    // Ambil data jika mode edit
    useEffect(() => {
        if (isEditMode) {
            const fetchChapter = async () => {
                try {
                    const res = await fetch(`https://storykuu-production.up.railway.app/api/chapters/${chapterId}`);
                    const data = await res.json();
                    setTitle(data.title || '');
                    setStory(data.story || '');
                } catch (err) {
                    alert('Failed to load chapter data.');
                }
            };
            fetchChapter();
        }
    }, [chapterId]);

    const handleStoryChange = (content) => {
        setStory(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !story.trim()) {
            alert("Title and story cannot be empty.");
            return;
        }

        setIsLoading(true);
        try {
            const endpoint = isEditMode
                ? `https://storykuu-production.up.railway.app/api/chapters/${chapterId}`
                : "https://storykuu-production.up.railway.app/api/chapters";

            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, story }),
            });

            if (response.ok) {
                alert(`Chapter ${isEditMode ? 'updated' : 'saved'} successfully!`);
                navigate(-1);
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Failed to save chapter'}`);
            }
        } catch (error) {
            console.error("Error saving chapter:", error);
            alert("Something went wrong. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="main-content">
                <div className="breadcrumb">
                    <span>Stories Management</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <a href="#" className="text-teal-400 hover:underline">Add Stories</a>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-teal-600">{isEditMode ? 'Edit Chapter' : 'Add Chapter'}</span>
                </div>

                <h1 className="title">{isEditMode ? 'Edit Chapter' : 'Add Chapter'}</h1>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate(-1)}
                    aria-label="Back to Stories"
                >
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </span>
                </button>

                <form className="chapter-form" onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Chapter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="story">Story</label>
                        <TipTapEditor content={story} onChange={handleStoryChange} />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setTitle('');
                                setStory('');
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={isLoading}>
                            {isLoading ? (isEditMode ? 'Updating...' : 'Saving...') : (isEditMode ? 'Update' : 'Save')}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AddChapter;
