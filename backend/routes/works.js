const express = require('express');
const router = express.Router();
const Work = require('../models/Work');

// Get all works
router.get('/', async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get works by category
router.get('/category/:category', async (req, res) => {
  try {
    const works = await Work.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new work
router.post('/', async (req, res) => {
  try {
    const work = new Work(req.body);
    const savedWork = await work.save();
    res.status(201).json(savedWork);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update work
router.put('/:id', async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete work
router.delete('/:id', async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;