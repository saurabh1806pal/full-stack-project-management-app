const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

// Create a new task
router.post('/', protect, createTask);

// Get all tasks in a workspace
router.get('/:workspaceId', protect, getTasks);

// Update a task
router.put('/:taskId', protect, updateTask);

// Delete a task
router.delete('/:taskId', protect, deleteTask);

module.exports = router;
