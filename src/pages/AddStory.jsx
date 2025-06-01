import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AddStory.css';
import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from 'react';

function AddStory() {
    const { id } = useParams(); // ambil id dari url, jika ada berarti edit
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);

    // Form state
    const [title, setTitle] = useState('');
    const [writerName, setWriterName] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [status, setStatus] = useState('Draft');
    const [tags, setTags] = useState(["Best", "Mental Illness", "Short"]);
    const [selectedkeyword, setSelectedkeyword] = useState('');
    const [coverImageError, setCoverImageError] = useState('');
    const [coverImageName, setCoverImageName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const [fetchingStory, setFetchingStory] = useState(false);
    const { storyId } = useParams();

    useEffect(() => {
        if (storyId) {
            const fetchStory = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/${storyId}`);
                    if (!res.ok) throw new Error("Failed to fetch story data");
                    const data = await res.json();
                    setTitle(data.title || '');
                    setWriterName(data.writer || '');
                    setSynopsis(data.synopsis || '');
                    setStatus(data.status || 'Draft');
                    setSelectedCategory(data.category || '');
                    setTags(data.keyword || []);
                    setCoverImageName(data.coverImageName || '');
                } catch (err) {
                    console.error("Error fetching story:", err);
                }
            };
            fetchStory();
        }
    }, [storyId]);

    // Toggle dropdown menu
    const toggleMenu = (index) => {
        setActiveMenuIndex(activeMenuIndex === index ? null : index);
    };

    const handleEditChapter = (chapterId) => {
        navigate(`/chapters/edit/${chapterId}`);
    };

    const handleDeleteChapter = async (chapterId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chapters/${chapterId}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error("Failed to delete chapter");
            setChapters(prev => prev.filter(chap => chap._id !== chapterId));
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete chapter");
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Fetch chapters on mount
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chapters`);
                if (!res.ok) throw new Error('Failed to fetch chapters');
                const data = await res.json();
                setChapters(data);
            } catch (err) {
                console.error('Failed to fetch chapters:', err);
            }
        };

        fetchChapters();
    }, []);

    // Fetch story data jika id ada (edit mode)
    useEffect(() => {
        if (!id) return;

        const fetchStory = async () => {
            setFetchingStory(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/${id}`);
                if (!res.ok) throw new Error('Story not found');
                const data = await res.json();

                // Isi form dengan data story yang di-fetch
                setTitle(data.title || '');
                setWriterName(data.writer || '');
                setSynopsis(data.synopsis || '');
                setStatus(data.status || 'Draft');
                setSelectedCategory(data.category || '');
                setTags(data.keyword || []);
                setCoverImageName(data.coverImageName || '');
            } catch (err) {
                console.error('Failed to fetch story:', err);
                setError('Failed to load story data');
            } finally {
                setFetchingStory(false);
            }
        };

        fetchStory();
    }, [id]);

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                setCoverImageError('Only JPG and PNG files are allowed.');
                setCoverImageName('');
            } else {
                setCoverImageError('');
                setCoverImageName(file.name);
            }
        }
    };

    const addTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handlekeywordChange = (e) => {
        const selected = e.target.value;
        setSelectedkeyword('');
        if (selected) addTag(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        setLoading(true);
        setError('');

        const storyData = {
            title,
            writer: writerName,
            synopsis,
            status,
            category: selectedCategory,
            keyword: tags,
            coverImageName,
            updatedAt: new Date().toISOString(),
        };

        try {
            let response;

            if (id) {
                // Edit mode: PUT request
                response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(storyData)
                });
            } else {
                // Add mode: POST request
                storyData.createdAt = new Date().toISOString();
                response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(storyData)
                });
            }

            if (response.ok) {
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to save story');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (fetchingStory) {
        return (
            <div style={{ padding: '2rem' }}>
                <p>Loading story data...</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="main-content">
                <div className="breadcrumb">
                    <span>Stories Management</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <a href="#" className="text-teal-400 hover:underline">{id ? "Edit Stories" : "Add Stories"}</a>
                </div>

                <h1 className="title">{id ? "Edit Stories" : "Add Stories"}</h1>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate('/')}
                    aria-label="Back to Stories Management"
                >
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </span>
                </button>

                <form className="story-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="writerName">Writer Name</label>
                            <input
                                id="writerName"
                                name="writerName"
                                type="text"
                                placeholder="Writer Name"
                                value={writerName}
                                onChange={e => setWriterName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea
                            id="synopsis"
                            name="synopsis"
                            rows="4"
                            placeholder="Synopsis"
                            value={synopsis}
                            onChange={e => setSynopsis(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="Fiksi">Fiksi</option>
                            <option value="Non-Fiksi">Non-Fiksi</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="keyword">Choose tags/keywords</label>
                            <select
                                id="keyword"
                                name="keyword"
                                value={selectedkeyword}
                                onChange={handlekeywordChange}
                            >
                                <option value="">Keywords</option>
                                <option value="Best">Best</option>
                                <option value="Mental Illness">Mental Illness</option>
                                <option value="Short">Short</option>
                                <option value="Long">Long</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Romance">Romance</option>
                                <option value="Mystery">Mystery</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tags">Tags/Keywords Story</label>
                            <div id="tags" className="tag-container">
                                {tags.map((tag, index) => (
                                    <span className="tag" key={index}>
                                        {tag}
                                        <button type="button" onClick={() => removeTag(index)}>×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-row items-center">
                        <div className="form-group relative">
                            <label htmlFor="coverImage">Cover Image</label>
                            <input
                                id="coverImage"
                                name="coverImage"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleCoverImageChange}
                            />
                            {coverImageName && <div className="text-xs text-gray-500 mt-1">{coverImageName}</div>}
                            {coverImageError && <div className="text-xs text-red-500 mt-1">{coverImageError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                <option value="Publish">Publish</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                        <div className="add-chapter-btn">
                            <button type="button" onClick={() => navigate('/add-chapter')}>
                                <i className="fas fa-plus"></i> Add Chapter
                            </button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Last Updated</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.length === 0 ? (
                                    <tr><td colSpan="3">No chapters added yet.</td></tr>
                                ) : (
                                    chapters.map((chap, index) => (
                                        <tr key={index}>
                                            <td>{chap.title}</td>
                                            <td>{new Date(chap.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEditChapter(chap.id)}
                                                    aria-label={`Edit chapter ${chap.title}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteChapter(chap.id)}
                                                    aria-label={`Delete chapter ${chap.title}`}
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

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                </form>
            </main>
        </div>
    );
}

export default AddStory;
