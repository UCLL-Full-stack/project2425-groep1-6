import ticketService from '../../service/Ticket.service';
import ticketDb from '../../repository/Ticket.db';

jest.mock('../../repository/Ticket.db', () => ({
    getAllTickets: jest.fn(),
    getTicketById: jest.fn(),
    addTicket: jest.fn(),
}));

describe('Ticket Service', () => {
    const mockTicket = {
        id: 1,
        price: 15,
        date: new Date('2024-01-01'),
        time: new Date('1970-01-01T18:00:00'),
        chair: 1,
    };

    test('getAllTickets: should return all tickets', async () => {
        (ticketDb.getAllTickets as jest.Mock).mockResolvedValue([mockTicket]);

        const tickets = await ticketService.getAllTickets();
        expect(tickets).toEqual([mockTicket]);
        expect(ticketDb.getAllTickets).toHaveBeenCalledTimes(1);
    });

    test('getTicketById: should return the ticket when it exists', async () => {
        (ticketDb.getTicketById as jest.Mock).mockResolvedValue(mockTicket);

        const ticket = await ticketService.getTicketById(1);
        expect(ticket).toEqual(mockTicket);
        expect(ticketDb.getTicketById).toHaveBeenCalledWith(1);
    });

    test('getTicketById: should throw an error when the ticket does not exist', async () => {
        (ticketDb.getTicketById as jest.Mock).mockResolvedValue(null);

        await expect(ticketService.getTicketById(999)).rejects.toThrow('Ticket with id 999 does not exist.');
        expect(ticketDb.getTicketById).toHaveBeenCalledWith(999);
    });

    test('addTicket: should add a ticket', async () => {
        (ticketDb.addTicket as jest.Mock).mockResolvedValue(mockTicket);
        const newTicket = await ticketService.addTicket({
            price: 15,
            date: '2024-01-01',
            time: '18:00',
            chair: 1,
            movieId: 1,
        });

        expect(newTicket).toEqual(mockTicket);
    });
});
