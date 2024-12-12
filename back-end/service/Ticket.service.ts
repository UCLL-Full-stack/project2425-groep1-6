import { Ticket } from '../model/Ticket';
import ticketDb from '../repository/Ticket.db';

const getAllTickets = async (): Promise<Ticket[]> => {
    return ticketDb.getAllTickets();
};

const getTicketById = async (id: number): Promise<Ticket> => {
    const ticket = await ticketDb.getTicketById(id);
    if (!ticket) {
        throw new Error(`Ticket with id ${id} does not exist.`);
    }
    return ticket;
};

export default {
    getAllTickets,
    getTicketById,
};
