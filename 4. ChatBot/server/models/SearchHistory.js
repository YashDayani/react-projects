// models/SearchHistory.js
const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
