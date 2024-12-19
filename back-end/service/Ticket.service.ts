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

const addTicket = async (ticketData: {
    price: number;
    date: string;
    time: string;
    chair: number;
    movieId: number;
  }) => {
    const newdate = new Date(ticketData.date);
    const newtime = new Date(ticketData.time);
    return await ticketDb.addTicket(ticketData.price, newdate, newtime, ticketData.chair, ticketData.movieId); 
  };

export default {
    getAllTickets,
    getTicketById,
    addTicket
};
