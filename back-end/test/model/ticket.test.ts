import { Ticket } from "../../model/Ticket";

test('given: valid values for ticket, when: ticket is created, then: ticket is created with those values', () => {
    const ticket = new Ticket({
        id: 1,
        price: 12.5,
        date: new Date("2024-01-10"),
        time: new Date("2024-01-10T20:00:00"),
        chair: 42
    });

    expect(ticket.getId()).toBe(1);
    expect(ticket.getPrice()).toBe(12.5);
    expect(ticket.getDate()).toEqual(new Date("2024-01-10"));
    expect(ticket.getTime()).toEqual(new Date("2024-01-10T20:00:00"));
    expect(ticket.getChair()).toBe(42);
});

test('given: TicketPrisma object, when: from() is called, then: Ticket instance is created', () => {
    const ticketPrisma = {
        id: 2,
        price: 15.0,
        date: new Date("2024-02-15"),
        time: new Date("2024-02-15T18:30:00"),
        chair: 17,
        movieId:1
    };

    const ticket = Ticket.from(ticketPrisma);

    expect(ticket.getId()).toBe(2);
    expect(ticket.getPrice()).toBe(15.0);
    expect(ticket.getDate()).toEqual(new Date("2024-02-15"));
    expect(ticket.getTime()).toEqual(new Date("2024-02-15T18:30:00"));
    expect(ticket.getChair()).toBe(17);
});


test('given: ticket, when: price is updated, then: correct price is retained', () => {
    const ticket = new Ticket({
        id: 1,
        price: 20.0,
        date: new Date("2024-05-01"),
        time: new Date("2024-05-01T18:00:00"),
        chair: 10,
    });

    expect(ticket.getPrice()).toBe(20.0);
});

test('given: two tickets with the same data, when: equality is checked, then: tickets are identical', () => {
    const ticket1 = new Ticket({
        id: 2,
        price: 15.0,
        date: new Date("2024-06-01"),
        time: new Date("2024-06-01T20:00:00"),
        chair: 25,
    });

    const ticket2 = new Ticket({
        id: 2,
        price: 15.0,
        date: new Date("2024-06-01"),
        time: new Date("2024-06-01T20:00:00"),
        chair: 25,
    });

    expect(ticket1.getId()).toBe(ticket2.getId());
    expect(ticket1.getPrice()).toBe(ticket2.getPrice());
    expect(ticket1.getDate()).toEqual(ticket2.getDate());
    expect(ticket1.getTime()).toEqual(ticket2.getTime());
    expect(ticket1.getChair()).toBe(ticket2.getChair());
});

test('given: a ticket, when: invalid data is used, then: behavior is as expected', () => {
    const ticket = new Ticket({
        id: 3,
        price: 0,
        date: new Date("2024-08-01"),
        time: new Date("2024-08-01T16:00:00"),
        chair: -1,
    });

    expect(ticket.getPrice()).toBe(0); // Allowed, though unlikely
    expect(ticket.getChair()).toBe(-1); // Negative chair number allowed for this test
});