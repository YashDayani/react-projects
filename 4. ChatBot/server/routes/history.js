const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SearchHistory = require('../models/SearchHistory');
const mongoose = require('mongoose');

console.log('History routes file loaded');

// Route to get search history
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user;
        const history = await SearchHistory.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ message: 'Error fetching search history.', error: error.message });
    }
});

// Route to get a specific search history item by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const historyItem = await SearchHistory.findOne({ _id: id, user: userId });

        if (!historyItem) {
            return res.status(404).json({ message: 'Search history item not found.' });
        }

        res.status(200).json({
            prompt: historyItem.prompt,
            response: historyItem.response
        });
    } catch (error) {
        console.error('Error fetching chat:', error.message);
        res.status(500).json({ message: 'Failed to fetch chat.', error: error.message });
    }
});

// Route to save search history
router.post('/', auth, async (req, res) => {
    console.log('POST /api/history route hit');
    try {
        const { prompt, response } = req.body;
        const userId = req.user;

        console.log('Received data:', { userId, prompt, response });

        const newHistory = new SearchHistory({
            user: userId,
            prompt,
            response
        });

        await newHistory.save();
        console.log('History saved successfully');
        res.status(201).json(newHistory);
    } catch (error) {
        console.error('Error saving search history:', error.message);
        res.status(500).json({ message: 'Error saving search history.', error: error.message });
    }
});

// Route to delete a specific search history item by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const historyItem = await SearchHistory.findOneAndDelete({ _id: id, user: userId });

        if (!historyItem) {
            return res.status(404).json({ message: 'Search history item not found.' });
        }

        res.status(200).json({ message: 'Chat deleted successfully.' });
    } catch (error) {
        console.error('Error deleting chat:', error.message);
        res.status(500).json({ message: 'Failed to delete chat.', error: error.message });
    }
});

module.exports = router;