import { Task } from '../models/Task.js';

export async function listTasks(req, res) {
  const tasks = await Task.find({ familyId: req.params.familyId }).sort({ createdAt: -1 });
  res.json(tasks);
}

export async function createTask(req, res) {
  const task = await Task.create({
    familyId: req.params.familyId,
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    assigneeId: req.body.assigneeId || null,
  });

  res.status(201).json(task);
}

export async function updateTaskStatus(req, res) {
  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    { status: req.body.status },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  return res.json(task);
}
