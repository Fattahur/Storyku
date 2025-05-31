import './App.css';
import StoryManagement from './pages/StoryManagement';
import { Routes, Route } from 'react-router-dom';
import AddStory from './pages/AddStory';
import AddChapter from './pages/AddChapter';


function App() {
  return (
    <Routes>
      <Route path="/" element={<StoryManagement />} />
      <Route path="/add-story" element={<AddStory />} />
      <Route path="/add-chapter" element={<AddChapter />} />
      <Route path="/chapters/edit/:chapterId" element={<AddChapter />} />
      <Route path="/stories/edit/:storyId" element={<AddStory />} />
    </Routes>
  );
}

export default App;
