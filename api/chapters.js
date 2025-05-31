const express = require('express');
const router = express.Router();

// Data sementara simpan chapters
let chapters = [];
let nextId = 1;  // Untuk ID unik bertambah

// GET semua chapters
router.get('/', (req, res) => {
  res.json(chapters);
});

// GET chapter by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const chapter = chapters.find(ch => ch.id === id);
  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  res.json(chapter);
});

// POST tambah chapter baru
router.post('/', (req, res) => {
  const { title, story } = req.body;
  if (!title || !story) {
    return res.status(400).json({ error: 'Title and story required' });
  }
  const newChapter = { id: chapters.length + 1, title, story };
  chapters.push(newChapter);
  res.status(201).json(newChapter);
});

// PUT update chapter by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, story } = req.body;

  const chapterIndex = chapters.findIndex(ch => ch.id === id);
  if (chapterIndex === -1) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  if (!title || !story) {
    return res.status(400).json({ error: 'Title and story required' });
  }

  chapters[chapterIndex] = { id, title, story };
  res.json(chapters[chapterIndex]);
});

// DELETE chapter by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const chapterIndex = chapters.findIndex(ch => ch.id === id);
  if (chapterIndex === -1) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  chapters.splice(chapterIndex, 1);
  res.json({ message: 'Chapter deleted successfully' });
});

module.exports = router;
