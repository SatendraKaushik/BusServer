const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);

// Use dynamic CORS origin based on environment variables or allow all origins
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*'; // Default to '*' if not set
const io = new Server(server, {
    cors: {
        origin: '*', // Allow connections from allowedOrigin
        methods: ["GET", "POST"],
    },
});

// Use CORS middleware for all routes
app.use(cors());

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for location updates
    socket.on('locationUpdate', (data) => {
        console.log('Location Update:', data);
        io.emit('locationUpdate', data); 
    });
});

// Use dynamic port from environment variables (Railway assigns this)
const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
