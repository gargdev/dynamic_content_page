const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update or create content
router.post('/', async (req, res) => {
  const { section, title, description, image } = req.body;
  try {
    const existing = await Content.findOne({ section });
    if (existing) {
      existing.title = title;
      existing.description = description;
      existing.image = image;
      await existing.save();
    } else {
      const newContent = new Content({ section, title, description, image });
      await newContent.save();
    }
    res.status(200).json({ message: 'Content updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete content by section
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
