const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // gunakan ini sebagai pengganti bodyParser.json()

let chapters = [];
let stories = [];

app.post('/api/chapters', (req, res) => {
  const { title, story } = req.body;
  if (!title || !story) {
    return res.status(400).json({ error: 'Title and story are required' });
  }

  const newChapter = {
    title,
    story,
    createdAt: new Date().toISOString()
  };

  chapters.push(newChapter);
  res.json({ message: 'Chapter saved successfully' });
});

app.get('/api/chapters', (req, res) => {
  res.json(chapters);
});

app.post('/api/stories', (req, res) => {
  const { title, writer, synopsis, status, category, keyword, coverImageName, createdAt } = req.body;

  if (!title || !writer || !synopsis) {
    return res.status(400).json({ message: 'Title, writer, and synopsis are required.' });
  }

  const newStory = {
    id: stories.length + 1,
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

app.get('/api/stories', (req, res) => {
  res.json(stories);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
