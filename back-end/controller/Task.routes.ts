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
    console.log('##########Inkomende JSON van de frontend:');
    console.log(JSON.stringify(req.body, null, 2)); // Mooi geformatteerde JSON

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

        console.log('JSON terug naar de frontend:');
        console.log(JSON.stringify(newTask, null, 2)); // Mooi geformatteerd

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

/**
 * @swagger
 * /tasks/{id}/assign:
 *   post:
 *     summary: Assign a task to a user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to assign.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user to assign the task to.
 *     responses:
 *       200:
 *         description: The task was successfully assigned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
taskRouter.post('/:id/assign', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const task = await taskService.assignTaskToUser(Number(req.params.id), userId);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/user/{userId}:
 *   get:
 *     summary: Get tasks assigned to a specific user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: A list of tasks assigned to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Task'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
taskRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.getTasksByUserId(Number(req.params.userId));
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/{id}/status:
 *   put:
 *     summary: Update the status of a task.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the task.
 *     responses:
 *       200:
 *         description: The task status was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
taskRouter.put('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        const taskId = Number(req.params.id);
        const task = await taskService.updateTaskStatus(taskId, status);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the task to delete.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Internal server error.
 */
taskRouter.delete(
    '/:id',
    async (req: Request & { auth?: any }, res: Response, next: NextFunction) => {
        try {
            const user = req.auth;
            await taskService.deleteTask(Number(req.params.id), user);
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
);

export { taskRouter };
