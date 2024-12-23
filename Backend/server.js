require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const binRoutes = require('./routes/binRoutes');

var cors = require('cors')

const app = express();
connectDB();

app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for simplicity (adjust in production)
        methods: ['GET', 'POST'],
    },
});

// Attach Socket.IO to the app
app.set('socketio', io);

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/bins', binRoutes);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
