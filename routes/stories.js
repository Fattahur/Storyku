const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

router.post('/', async (req, res) => {
  try {
    const newStory = new Story(req.body);
    const saved = await newStory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
