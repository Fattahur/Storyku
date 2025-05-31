// Sidebar.js
import '../styles/Sidebar.css';
import { FaBars, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="sidebar-header">
        <img
          src="https://storage.googleapis.com/a1aa/image/ec5cd81f-99bf-48e4-6272-fa35f234b45b.jpg"
          alt="Storyku logo"
          className="sidebar-logo"
        />
        {isOpen && <span className="sidebar-brand">STORYKU</span>}

        {/* Icon Toggle */}
        <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {isOpen ? <FaAngleLeft /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <nav className="sidebar-nav">
          <a href="#" className="nav-link">
            <i className="fas fa-th-large"></i> Dashboard
          </a>
          <a href="#" className="nav-link active" onClick={() => navigate('/')}>
            <i className="fas fa-book-open"></i> Story Management
          </a>
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;
