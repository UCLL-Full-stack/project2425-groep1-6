/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Authentication response message.
 *         token:
 *           type: string
 *           description: JWT access token.
 *         username:
 *           type: string
 *           description: Authenticated user's username.
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User's username.
 *         password:
 *           type: string
 *           description: User's password.
 *       required:
 *         - username
 *         - password
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the user.
 *         username:
 *           type: string
 *           description: User's username.
 *         password:
 *           type: string
 *           description: User's password.
 *         email:
 *           type: string
 *           description: User's email address.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User's username.
 *         password:
 *           type: string
 *           description: User's password.
 *         email:
 *           type: string
 *           description: User's email address.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *       required:
 *         - username
 *         - password
 *         - email
 *     Role:
 *       type: string
 *       enum:
 *         - user
 *         - worker
 *         - admin
 *         - guest
 */

import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/User.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user's ID.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login using username/password. Returns a JWT token upon success.
 *     requestBody:
 *       description: User login credentials.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Successfully authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 *       401:
 *         description: Invalid username or password.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user.
 *     requestBody:
 *       description: User registration details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input. Missing or malformed data.
 *       409:
 *         description: Username or email already exists.
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Valideer of de gegevens aanwezig zijn
        const { username, password, email, role }: UserInput = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newUser = await userService.createUser({
            username,
            password,
            email,
            role,
        });

        res.status(200).json({
            id: newUser.getId(),
            username: newUser.getUsername(),
            email: newUser.getEmail(),
        });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
