import { Router } from 'express';
import { createFamily, listFamilies } from '../controllers/familyController.js';
import { createMember, listMembers } from '../controllers/memberController.js';
import { createEvent, listEvents } from '../controllers/eventController.js';
import { createTask, listTasks, updateTaskStatus } from '../controllers/taskController.js';

export const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.get('/families', listFamilies);
router.post('/families', createFamily);

router.get('/families/:familyId/members', listMembers);
router.post('/families/:familyId/members', createMember);

router.get('/families/:familyId/events', listEvents);
router.post('/families/:familyId/events', createEvent);

router.get('/families/:familyId/tasks', listTasks);
router.post('/families/:familyId/tasks', createTask);
router.patch('/tasks/:taskId/status', updateTaskStatus);
