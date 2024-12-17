/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the task.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the task.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time of the task.
 *         description:
 *           type: string
 *           description: Description of the task.
 *         status:
 *           type: string
 *           description: Status of the task. Possible values: pending, completed, canceled.
 *         comment:
 *           type: string
 *           description: Additional comments about the task.
 *     TaskCreateRequest:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the task.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time of the task.
 *         description:
 *           type: string
 *           description: Description of the task.
 *         status:
 *           type: string
 *           description: Status of the task.
 *         comment:
 *           type: string
 *           description: Additional comments about the task.
 *       required:
 *         - date
 *         - time
 *         - description
 *         - status
 */

import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/Task.service';

const taskRouter = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get a list of all tasks.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
taskRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID.
 *     responses:
 *       200:
 *         description: A task object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found.
 */
taskRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.getTaskById(Number(req.params.id));
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

export { taskRouter };
