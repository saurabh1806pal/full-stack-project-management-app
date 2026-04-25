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

// Routes Imports

// This is the Authentication Routes
const authRoutes = require('./src/routes/auth.routes');
const { protect } = require('./src/middleware/auth.middleware');
// This is the Workspace Routes
const workspaceRoutes = require('./src/routes/workspace.routes');


// Routes Middleware
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running on port ${PORT}`));