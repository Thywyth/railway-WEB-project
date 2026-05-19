import { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = useCallback((seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  }, []);

  const clearBooking = useCallback(() => {
    setSelectedTrain(null);
    setSelectedWagon(null);
    setSelectedSeats([]);
  }, []);

  const value = {
    selectedTrain,
    selectedWagon,
    selectedSeats,
    setSelectedTrain,
    setSelectedWagon,
    toggleSeat,
    clearBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
