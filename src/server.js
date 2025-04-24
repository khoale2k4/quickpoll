const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js server' });
});

// Import routes
const apiRoutes = require('./routes/api');
const pollsRoutes = require('./routes/polls');

app.use('/api', apiRoutes);
app.use('/polls', pollsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 