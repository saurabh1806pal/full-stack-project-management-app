const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { createWorkspace, deleteWorkspace, getUserWorkspaces, addMember } = require('../controllers/workspace.controller');

// Create a new workspace
router.post('/', protect, createWorkspace);

// Delete a Workspace
router.delete('/:workspaceId', protect, deleteWorkspace);

// Get all workspaces for the authenticated user
router.get('/', protect, getUserWorkspaces);

// Add a member to a workspace
router.post('/:workspaceId/members', protect, addMember);


module.exports = router;