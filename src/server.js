const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const { handleConnet } = require('./socket/index');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
// socket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js server' });
});

// Import routes
const apiRoutes = require('./routes/api');
const { router: pollsRoutes } = require('./routes/polls');

app.use('/api', apiRoutes);
app.use('/polls', pollsRoutes);

const { startSocket } = require('./socket/index');
io.on('connection', startSocket);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 