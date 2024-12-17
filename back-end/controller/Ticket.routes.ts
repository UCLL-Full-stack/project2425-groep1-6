/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the ticket.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the ticket in USD.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date associated with the ticket.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time associated with the ticket.
 *         chair:
 *           type: number
 *           description: Chair number assigned to the ticket.
 *         movieId:
 *           type: number
 *           format: int64
 *           description: ID of the movie this ticket is associated with.
 *       required:
 *         - price
 *         - date
 *         - time
 *         - chair
 *         - movieId
 *     TicketCreateRequest:
 *       type: object
 *       properties:
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the ticket in USD.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the ticket.
 *         time:
 *           type: string
 *           format: date-time
 *           description: The time of the ticket.
 *         chair:
 *           type: number
 *           description: Chair number for the ticket.
 *         movieId:
 *           type: number
 *           format: int64
 *           description: ID of the movie this ticket is associated with.
 *       required:
 *         - price
 *         - date
 *         - time
 *         - chair
 *         - movieId
 */

import express, { NextFunction, Request, Response } from 'express';
import ticketService from '../service/Ticket.service';

const ticketRouter = express.Router();

/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Get a list of all tickets.
 *     responses:
 *       200:
 *         description: A list of tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
ticketRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ticket ID.
 *     responses:
 *       200:
 *         description: A ticket object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found.
 */

ticketRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = await ticketService.getTicketById(Number(req.params.id));
        if (!ticket) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.status(200).json(ticket);
    } catch (error) {
        next(error);
    }
});

export { ticketRouter };
