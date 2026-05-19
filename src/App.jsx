import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookingProvider } from "./context/BookingContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>
        <ToastContainer
          theme="dark"
          position="top-center"
          toastStyle={{
            background: "#1a2a4a",
            border: "1px solid rgba(255,200,0,0.25)",
            color: "#e8eaf0",
          }}
        />
      </BookingProvider>
    </BrowserRouter>
  );
}
