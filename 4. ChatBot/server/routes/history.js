const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Ensure this path is correct
const SearchHistory = require('../models/SearchHistory');
const cors = require('cors');

router.use(cors());

// Route to save search history
router.post('/', auth, async (req, res) => {
    try {
    const { prompt, response } = req.body;
    const user = req.user;

    if (!prompt || !response) {
      return res.status(400).json({ message: 'Prompt and response are required' });
    }

    const newHistory = new SearchHistory({
      prompt,
      response,
      user
    });

    await newHistory.save();
    res.status(201).json({ message: 'Search history saved successfully' });
    } catch (error) {
    console.error('Error saving search history:', error);
    res.status(500).json({ message: 'Error saving search history', error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
    try {
      // Your existing code to get search history
      // ...
    } catch (error) {
      console.error('Error fetching search history:', error);
      res.status(500).json({ message: 'Error fetching search history', error: error.message });
    }
  });

module.exports = router;
