const Workspace = require('../models/workSpace');

// Create a new workspace
exports.createWorkspace = async (req, res) => {
    const { name } = req.body;
    try {
        const workspace = new Workspace({ name, owner: req.user._id, members: [{ user: req.user._id, role: 'admin' }], message: 'Workspace created successfully' });
        await workspace.save();
        res.status(201).json(workspace);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete workspace
exports.deleteWorkspace = async (req, res) => {
  const { workspaceId } = req.params;

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    return res.status(404).json({ message: "Workspace not found" });
  }

  // Check if user is admin
  const member = workspace.members.find(
    (m) => m.user.toString() === req.user._id.toString()
  );

  if (!member || member.role !== "admin") {
    return res.status(403).json({ message: "Only admin can delete workspace" });
  }

  // Delete related tasks
//   await Task.deleteMany({ workspace: workspaceId });

  // Delete workspace
  await workspace.deleteOne();

  res.json({ message: "Workspace deleted successfully" });
};

// Get all workspaces for the authenticated user
exports.getUserWorkspaces = async (req, res) => {
    try{
        const workspaces = await Workspace.find({
            $or:[{ owner: req.user._id }, { "members.user": req.user._id }]
        }).populate('owner', 'name email').populate('members.user', 'name email');
        res.json(workspaces);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

// Add a member to a workspace
exports.addMember = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { userId } = req.body;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    const alreadyMember = workspace.members.find(
      (m) => m.user.toString() === userId
    );

    if (alreadyMember) {
      return res.status(400).json({ message: "User already in workspace" });
    }

    workspace.members.push({ user: userId });

    await workspace.save();

    res.json(workspace);
  } catch (error) {
    console.error("ADD MEMBER ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({ message: error.message }); // 👈 show real error
  }
};