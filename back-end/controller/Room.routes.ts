/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the room.
 *         name:
 *           type: string
 *           description: The name of the room.
 *         chairs:
 *           type: array
 *           items:
 *             type: number
 *           description: List of chair numbers in the room.
 *     RoomCreateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the room.
 *         chairs:
 *           type: array
 *           items:
 *             type: number
 *           description: List of chair numbers in the room.
 *       required:
 *         - name
 *         - chairs
 */

import express, { NextFunction, Request, Response } from 'express';
import roomService from '../service/Room.service';

const roomRouter = express.Router();

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get a list of all rooms.
 *     responses:
 *       200:
 *         description: A list of rooms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
roomRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get a room by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The room ID.
 *     responses:
 *       200:
 *         description: A room object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found.
 */
roomRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const room = await roomService.getRoomById(Number(req.params.id));
        if (!room) {
            res.status(404).json({ message: "Room not found" });
            return;
        }
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
});

export { roomRouter };
