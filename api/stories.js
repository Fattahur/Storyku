const express = require('express');
const router = express.Router();

// Contoh data stories sementara (bisa diganti dengan DB nanti)
let stories = [];

// POST /api/stories — menambahkan story baru
router.post('/', (req, res) => {
  const { title, writer, synopsis, status, category, keyword, coverImageName, createdAt } = req.body;

  if (!title || !writer || !synopsis) {
    return res.status(400).json({ message: 'Title, writer, and synopsis are required.' });
  }

  // Generate new ID unik (misalnya incremental)
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

// GET /api/stories — dapatkan semua stories
router.get('/', (req, res) => {
  res.json(stories);
});

// GET /api/stories/:id — dapatkan story berdasarkan ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const story = stories.find(s => s.id === id);
  if (!story) {
    return res.status(404).json({ message: 'Story not found.' });
  }
  res.json(story);
});

// PUT /api/stories/:id — update story berdasarkan ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = stories.findIndex(story => story.id === id);
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
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = stories.findIndex(story => story.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Story not found.' });
  }

  stories.splice(index, 1);

  res.status(200).json({ message: 'Story deleted successfully.' });
});

module.exports = router;
