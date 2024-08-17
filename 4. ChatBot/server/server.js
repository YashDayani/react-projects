const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/history');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import Models
const User = require('./models/User');
const SearchHistory = require('./models/SearchHistory');

// Define Routes
app.use('/api/users', authRoutes);
app.use('/api/history', historyRoutes);

// Input validation middleware
const registerValidation = [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

// Helper function to handle errors
const handleErrors = (res, error) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
};

// Register endpoint
app.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
});

// Login endpoint
app.post('/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log('Login attempt for email:', req.body.email);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found, comparing passwords');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password match, generating token');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });

    console.log('Login successful for email:', email);
    res.status(200).json({ token, redirectUrl: '/dashboard' });
  } catch (error) {
    console.error('Login error:', error);
    handleErrors(res, error);
  }
});

// Middleware to verify token and attach user to the request
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Get user ID from token
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

// Route to get the current user's name
app.get('/api/user/name', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('username');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.username });
  } catch (error) {
    handleErrors(res, error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
