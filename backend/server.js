const express = require('express');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/lawyers', require('./routes/lawyerRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Database connection
connectDB();

// Socket.io integration
require('./sockets/chatSocket')(io);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API Running'));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
