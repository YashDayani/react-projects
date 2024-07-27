const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
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
            user // Include user ID
        });

        await newHistory.save();
        res.status(201).json({ message: 'Search history saved successfully' });
    } catch (error) {
        console.error('Error saving search history:', error);
        res.status(500).json({ message: 'Error saving search history', error: error.message });
    }
});

// Route to get search history
router.get('/', auth, async (req, res) => {
    try {
        const user = req.user;
        const history = await SearchHistory.find({ user }).sort({ createdAt: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ message: 'Error fetching search history', error: error.message });
    }
});

// Delete all search history for the authenticated user
router.delete('/', auth, async (req, res) => {
    try {
        const userId = req.user;
        await SearchHistory.deleteMany({ user: userId });
        res.status(200).json({ message: 'All chats deleted successfully.' });
    } catch (error) {
        console.error('Error deleting all chats:', error.message);
        res.status(500).json({ message: 'Failed to delete all chats.' });
    }
});

// Delete a specific search history item by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const historyItem = await SearchHistory.findOneAndDelete({ _id: id, user });

        if (!historyItem) {
            return res.status(404).json({ message: 'Search history item not found' });
        }

        res.status(200).json({ message: 'Chat deleted successfully.' });
    } catch (error) {
        console.error('Error deleting chat:', error.message);
        res.status(500).json({ message: 'Failed to delete chat.' });
    }
});

module.exports = router;
