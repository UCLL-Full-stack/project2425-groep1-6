import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Header from "@/components/header";
import Head from "next/head";
import { useState } from "react";
import TicketService from "@/services/ticketService";
import Seats from "@/components/ticket/seat";
import { Ticket } from "@/types";

const Tickets: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id, moviename, playingdates } = router.query;

  const ticketPrice = 15;
  const parsedPlayingDates = playingdates
    ? JSON.parse(playingdates as string)
    : [];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number>(0);

  const handleBuyTicket = async () => {
    if (selectedDate && selectedTime) {
      const confirmation = window.confirm(
        `Are you sure you want to buy ${selectedSeats} ticket(s) for ${moviename} on ${selectedDate} at ${selectedTime}?`
      );
      if (confirmation) {
        try {
            const ticketData = {
                price: ticketPrice * selectedSeats,
                date: new Date(selectedDate),
                time: new Date(selectedTime), 
                chair: selectedSeats, 
                movieId: Number(id), 
              };
    
            const response = await TicketService.addTicket(ticketData);
    
            if (response.ok) {
              alert(
                `You have successfully purchased ${selectedSeats} ticket(s) for ${moviename} on ${selectedDate} at ${selectedTime}.`
              );
            } else {
              alert(`Failed to purchase tickets: ${response.statusText}`);
            }
          }
        catch (error) {
            console.error("Error purchasing tickets:", error);
            alert("An error occurred while processing your request.");
          }
        } else {
          alert("Purchase canceled.");
        }
    }
  };

  return (
    <>
      <Head>
        <title>Bio-Scope</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        {!showSeats ? (
          <>
            <h1>Buy Your Tickets Here:</h1>
            {moviename ? (
              <section className="text-center">
                <h2>{moviename} Dates:</h2>
                <ul className="list-none">
                  {parsedPlayingDates.map((date: string, index: number) => {
                    const formattedDate = new Date(date).toLocaleDateString();
                    const formattedTime = new Date(date).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );

                    return (
                      <li key={index} className="mb-2">
                        <span className="block">Date: {formattedDate}</span>
                        <span className="block">Time: {formattedTime}</span>
                        <span className="block">Price: €{ticketPrice}</span>
                        <button
                          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                          onClick={() => {
                            setSelectedDate(formattedDate);
                            setSelectedTime(formattedTime);
                            setShowSeats(true);
                          }}
                        >
                          Buy Here
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : (
              <p>{t("tickets.nomovie")}</p>
            )}
          </>
        ) : (
          <div>
            <h1>Select Your Seats</h1>
            <Seats onSelectSeats={setSelectedSeats} />
            <button
              className="mt-4 mr-2 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
              onClick={handleBuyTicket}
            >
              Confirm Purchase
            </button>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
              onClick={() => setShowSeats(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Tickets;
