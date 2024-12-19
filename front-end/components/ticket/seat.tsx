import React, { useEffect, useState } from "react";


type SeatsProps = {
    onSelectSeats: (count: number) => void;
  };

const Seats: React.FC<SeatsProps> = ({ onSelectSeats }) => {
  const rows = 6;
  const columns = 20;
  const [selectedSeats, setSelectedSeats] = useState<Set<string>> (new Set());


  const toggleSeat = (row: number, column: number) => {
    const seatId = `${row}-${column}`;
    const newSelectedSeats = new Set(selectedSeats);

    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId); 
    } else {
      newSelectedSeats.add(seatId);
    }

    setSelectedSeats(newSelectedSeats);
  };

  useEffect(() => {
    onSelectSeats(selectedSeats.size); 
  }, [selectedSeats, onSelectSeats]);


  return (
    <>
        <h2>Select Seats:</h2>
        <div className="flex flex-col items-center">
        {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex">
                
            {Array.from({ length: columns }).map((_, column) => {
                const seatId = `${row}-${column}`;
                const isSelected = selectedSeats.has(seatId);
                return (
                <div
                    key={column}
                    className={`w-8 h-8 border border-gray-300 m-1 flex items-center justify-center cursor-pointer ${
                    isSelected ? "bg-green-500" : "bg-gray-200"
                    }`}
                    onClick={() => toggleSeat(row, column)}
                />
                );
            })}
            </div>
        ))}
        </div>
    </>
  );
};

export default Seats;
