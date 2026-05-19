export const BookingService = {
  saveBooking(booking) {
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push({ ...booking, id: Date.now() });
    localStorage.setItem("bookings", JSON.stringify(existing));
  },

  getBookings() {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  },

  deleteBooking(id) {
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    const filtered = existing.filter((b) => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(filtered));
  },

  clearAll() {
    localStorage.removeItem("bookings");
  },
};
