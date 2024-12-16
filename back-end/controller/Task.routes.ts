/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Task:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the task.
 *            date:
 *              type: string
 *              format: date-time
 *              description: The date of the task.
 *            time:
 *              type: string
 *              format: date-time
 *              description: The time of the task.
 *            description:
 *              type: string
 *              description: Description of the task.
 *            status:
 *              type: string
 *              description: Status of the task.
 *            comment:
 *              type: string
 *              description: Additional comments.
 */

import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/Task.service';

const taskRouter = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get a list of all tasks.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
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
 * /tasks:
 *   post:
 *     summary: Add a new task.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input.
 */
taskRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, time, description, status, comment, roomId } = req.body;
        const newTask = await taskService.addTask(
            new Date(date),
            new Date(time),
            description,
            status,
            comment,
            roomId
        );
        res.status(200).json(newTask);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      summary: Get a task by its ID.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The task ID.
 *      responses:
 *          200:
 *              description: A task object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          404:
 *              description: Task not found.
 */
taskRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.getTaskById(Number(req.params.id));
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

export { taskRouter };
