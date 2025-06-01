const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Gunakan ini sebagai pengganti bodyParser.json()

let chapters = [];
let stories = [];
let nextChapterId = 1;  // Tambah variabel id untuk chapter

// ========== CHAPTER ROUTES ==========

app.post('/api/chapters', (req, res) => {
  const { title, story } = req.body;
  if (!title || !story) {
    return res.status(400).json({ error: 'Title and story are required' });
  }

  const newChapter = {
    id: nextChapterId++,   // <-- otomatis id bertambah
    title,
    story,
    createdAt: new Date().toISOString(),
  };

  chapters.push(newChapter);
  res.status(201).json(newChapter);  // balikin chapter dengan id-nya
});

app.get('/api/chapters', (req, res) => {
  res.json(chapters);
});

app.get('/api/chapters/:id', (req, res) => {
  const id = Number(req.params.id);
  const chapter = chapters.find(c => c.id === id);
  if (!chapter) {
    return res.status(404).json({ message: 'Chapter not found' });
  }
  res.json(chapter);
});

app.put('/api/chapters/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = chapters.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Chapter not found' });
  }

  const { title, story } = req.body;
  if (!title || !story) {
    return res.status(400).json({ message: 'Title and story are required' });
  }

  chapters[index] = {
    ...chapters[index],
    title,
    story,
  };

  res.json(chapters[index]);
});

app.delete('/api/chapters/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = chapters.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Chapter not found' });
  }

  chapters.splice(index, 1);
  res.json({ message: 'Chapter deleted successfully' });
});

// ========== STORY ROUTES ==========

// POST /api/stories — tambah story baru
app.post('/api/stories', (req, res) => {
  const { title, writer, synopsis, status, category, keyword, coverImageName, createdAt } = req.body;

  if (!title || !writer || !synopsis) {
    return res.status(400).json({ message: 'Title, writer, and synopsis are required.' });
  }

  const newId = stories.length > 0 ? Math.max(...stories.map(s => s.id)) + 1 : 1;

  const newStory = {
    id: newId,
    title,
    writer,
    synopsis,
    status: status || 'Draft',
    category: category || '',
    keyword: Array.isArray(keyword) ? keyword : [],
    coverImageName: coverImageName || '',
    createdAt: createdAt || new Date().toISOString(),
  };

  stories.push(newStory);
  res.status(201).json(newStory);
});

// GET /api/stories — dapatkan semua story
app.get('/api/stories', (req, res) => {
  res.json(stories);
});

// GET /api/stories/:id — dapatkan story berdasarkan ID
app.get('/api/stories/:id', (req, res) => {
  const id = Number(req.params.id);
  const story = stories.find(s => s.id === id);
  if (!story) {
    return res.status(404).json({ message: 'Story not found.' });
  }
  res.json(story);
});

// PUT /api/stories/:id — update story berdasarkan ID
app.put('/api/stories/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = stories.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Story not found.' });
  }

  const { title, writer, synopsis, status, category, keyword, coverImageName } = req.body;

  if (!title || !writer || !synopsis) {
    return res.status(400).json({ message: 'Title, writer, and synopsis are required.' });
  }

  stories[index] = {
    ...stories[index],
    title,
    writer,
    synopsis,
    status: status || stories[index].status,
    category: category || stories[index].category,
    keyword: Array.isArray(keyword) ? keyword : stories[index].keyword,
    coverImageName: coverImageName || stories[index].coverImageName,
  };

  res.json(stories[index]);
});

// DELETE /api/stories/:id — hapus story berdasarkan ID
app.delete('/api/stories/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = stories.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Story not found.' });
  }

  stories.splice(index, 1);
  res.json({ message: 'Story deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
