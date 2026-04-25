const http = require('http');
const { Server } = require('socket.io');

// Other Configs
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// WebSocket Setup for real-time updates and CORS configuration
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});


// Scocket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinWorkspace", (workspaceId) => {
    socket.join(workspaceId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


// Socket.io instance export for use in controllers
const { initSocket } = require('./src/socket');
initSocket(io);

// Routes Imports

// This is the Authentication Routes
const authRoutes = require('./src/routes/auth.routes');
const { protect } = require('./src/middleware/auth.middleware');
// This is the Workspace Routes
const workspaceRoutes = require('./src/routes/workspace.routes');
// Task Routes
const taskRoutes = require('./src/routes/task.routes');


// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT;
server.listen(PORT, console.log(`Server running on port ${PORT}`));