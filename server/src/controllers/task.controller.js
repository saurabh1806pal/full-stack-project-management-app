const Task = require('../models/Task');
const workSpace = require('../models/workSpace');

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, workspaceId, assignedTo, priority, dueDate } = req.body;

    // check if the workspace exists
    const workspace = await workSpace.findById(workspaceId);

    const isMember = workspace.members.find((member) => member.user.toString() === req.user._id.toString());

    if(!isMember){
        return res.status(400).json({message: "You are not allowed to create task in this workspace"})
    }

    const newTask = new Task({
        title,
        description,
        workspace: workspaceId,
        assignedTo,
        priority,
        dueDate,
        createdBy: req.user._id
    });

    await newTask.save();
    res.status(201).json(newTask);
}

// Get all tasks in a workspace
exports.getTasks = async (req, res) => {
    const { workspaceId } = req.params;

    // check if the workspace exists
    const workspace = await workSpace.findById(workspaceId);

    const isMember = workspace.members.find((member) => member.user.toString() === req.user._id.toString());
    
    if(!isMember){
        return res.status(400).json({message: "You are not allowed to view tasks in this workspace"})
    }

    const tasks = await Task.find({ workspace: workspaceId });
    res.status(200).json(tasks);
}

// Update a task
exports.updateTask = async (req, res) => {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task with the new data
    Object.assign(task, req.body);
    await task.save();
    res.status(200).json(task);
};

// Delete a task
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully' });
};