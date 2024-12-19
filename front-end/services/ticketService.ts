import { Ticket } from "@/types";

const getAllTickets = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  
  const getTicketById = async (ticketId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${ticketId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
 
  const addTicket = async (ticket: Ticket) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/ticket/addticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });
  }

  
  const TicketService = {
    getAllTickets,
    getTicketById,
    addTicket
  };
  
  export default TicketService;
  