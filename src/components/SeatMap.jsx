import { useBooking } from "../context/BookingContext";
import styles from "./SeatMap.module.css";

export default function SeatMap() {
  const { selectedWagon, selectedSeats, toggleSeat } = useBooking();

  if (!selectedWagon) {
    return (
      <div className={styles.placeholder}>
        <span>🚃</span>
        <p>Оберіть вагон, щоб побачити схему місць</p>
      </div>
    );
  }

  const { seats, type, totalSeats } = selectedWagon;
  const bookedCount = seats.filter((s) => s.status === "booked").length;
  const freeCount = seats.filter((s) => s.status === "free").length;

  // Determine columns based on wagon type
  const cols = type === "Купе" ? 4 : type === "СВ" || type === "Люкс" ? 2 : 6;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Схема місць — {type} (Вагон {selectedWagon.id})
        </h3>
        <div className={styles.stats}>
          <span className={styles.statFree}>
            <span className={styles.dot} data-status="free" />
            Вільних: {freeCount}
          </span>
          <span className={styles.statBooked}>
            <span className={styles.dot} data-status="booked" />
            Заброньовано: {bookedCount}
          </span>
          {selectedSeats.length > 0 && (
            <span className={styles.statSelected}>
              <span className={styles.dot} data-status="selected" />
              Обрано: {selectedSeats.length}
            </span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <span className={`${styles.legendItem} ${styles.legendFree}`}>
          Вільне
        </span>
        <span className={`${styles.legendItem} ${styles.legendSelected}`}>
          Обране
        </span>
        <span className={`${styles.legendItem} ${styles.legendBooked}`}>
          Зайняте
        </span>
      </div>

      {/* Seat grid */}
      <div
        className={styles.grid}
        style={{ "--cols": cols }}
        aria-label="Схема вагона"
      >
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          const isBooked = seat.status === "booked";

          let statusClass = styles.seatFree;
          if (isBooked) statusClass = styles.seatBooked;
          else if (isSelected) statusClass = styles.seatSelected;

          return (
            <button
              key={seat.id}
              className={`${styles.seat} ${statusClass}`}
              onClick={() => !isBooked && toggleSeat(seat.id)}
              disabled={isBooked}
              aria-label={`Місце ${seat.id} — ${isBooked ? "зайняте" : isSelected ? "обране" : "вільне"}`}
              title={`Місце №${seat.id}`}
              id={`seat-${selectedWagon.id}-${seat.id}`}
            >
              {seat.id}
            </button>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <div className={styles.selectionInfo}>
          <span>🎫 Обрані місця: </span>
          <span className={styles.seatTags}>
            {selectedSeats.map((id) => (
              <span key={id} className={styles.seatTag}>
                #{id}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}
