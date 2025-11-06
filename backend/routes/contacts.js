const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark contact as seen
router.patch('/:id/seen', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { seen: true },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;