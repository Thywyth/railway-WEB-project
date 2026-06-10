# 🚂 Ukrzaliznytsia — Railway Ticket Booking System

A full-featured, responsive React application designed for searching, filtering, and booking train tickets across Ukraine. This project demonstrates production-ready state management, client-side routing, and complex interactive UI components.

---

## 🖥️ Technical Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 18+ | Core UI library for component-based architecture |
| **Vite** | 6+ | Fast next-generation frontend tooling and bundling |
| **react-router-dom** | 7+ | Client-side routing and navigation |
| **react-toastify** | 11+ | Smooth, non-blocking toast notifications |
| **CSS Modules** | — | Isolated component styling to prevent global scope pollution |
| **Context API** | — | Global state management for tracking booking sessions |
| **localStorage** | — | Client-side data persistence for storing booked tickets |

---

## ✨ Core Functionality & Features

The development was structured into two core evolutionary phases to ensure scalability:

### 🔍 Phase 1: Search, Filter & Discovery Engine
* **Comprehensive Route Database:** Includes 8 pre-configured train routes across major Ukrainian destinations with real-time dynamic data.
* **Smart Search:** Instant search functionality filtering by train number, departure city, or arrival station.
* **Advanced Multi-Filtering:** Quick filters by origin, destination, and exact travel date.
* **Live Availability Tracker:** Real-time seat counter updates for each specific train ride.
* **Accessibility (A11y):** Built using semantic HTML and complete ARIA attributes for screen-reader compatibility.

### 🎫 Phase 2: Interactive Seating Matrix & Reservation
* **WagonSelector:** Dynamic tabs allowing users to switch seamlessly between different wagon classes (Coupe, Berth/Platskart, De Luxe/CB).
* **Interactive SeatMap:** A high-fidelity interactive grid with precise color-coding animations:
  * 🟢 **Available:** Ready for selection.
  * 🔵 **Selected:** Features a smooth, pulsing micro-animation.
  * 🔴 **Occupied:** Hard-disabled and locked out.
* **Smart BookingForm:** Lightweight passenger checkout form featuring real-time input validation (Full Name, Phone, and Email formats).
* **Live Cost Calculator:** Dynamically recalculates total checkout prices based on chosen seat tiers and counts.
* **Feedback System:** Immediate feedback via animated Toast notifications upon successful order placements.
* **Data Persistence:** Full CRUD operations mirrored instantly to `localStorage` to save user bookings across page reloads.

---

## 📁 Project Architecture

```text
src/
├── components/
│   ├── TrainCard.jsx          # Individual train card with route & call-to-action
│   ├── TrainCard.module.css
│   ├── TrainList.jsx          # Grid container for train cards with empty-states
│   ├── TrainList.module.css
│   ├── WagonSelector.jsx      # Tab switching engine for wagon classes
│   ├── WagonSelector.module.css
│   ├── SeatMap.jsx            # Interactive matrix for live seat selection
│   ├── SeatMap.module.css
│   ├── BookingForm.jsx        # Validation-ready passenger checkout form
│   └── BookingForm.module.css
├── context/
│   └── BookingContext.jsx     # Centralized global booking state provider
├── data/
│   └── trains.js              # Mock database for train routes (8 destinations)
├── pages/
│   ├── Home.jsx               # Main Search & Discovery dashboard
│   ├── Home.module.css
│   ├── Booking.jsx            # Dedicated checkout & wagon schema page
│   └── Booking.module.css
├── services/
│   └── BookingService.js      # LocalStorage wrapper handling persistence
├── App.jsx                    # Global routing, core providers, and entry layout
└── main.jsx                   # Application bootstrap mount point
```

---

## 🎨 UI/UX Design Standards
* **Themed Color Palette:** High-contrast dark theme inspired by modern railway applications (Deep railway blues paired with signature `#FFC800` amber accents).
* **Modern Effects:** Clean Glassmorphism styling utilized on search panels to create depth.
* **Micro-interactions:** Interactive hover states, active transitions, and responsive cards designed using a **Mobile-First** layout approach.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js LTS** (v18 or v20+)
* **npm** (v9+)

### Installation & Local Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/Thywyth/railway-WEB-project.git](https://github.com/Thywyth/railway-WEB-project.git)
cd railway-WEB-project
```

2. **Install project dependencies:**
```bash
npm install
```

3. **Launch the development server:**
```bash
npm run dev
```
*The application will boot and run locally at:* `http://localhost:5173`

### Production Deployment
To build and preview the optimized production build locally:
```bash
npm run build
npm run preview
```

---

## 👤 Author
* **Roman Tsizdyn** — Frontend Developer
* GitHub: [@Thywyth](https://github.com/Thywyth)
