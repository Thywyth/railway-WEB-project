import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { trains } from "../data/trains";
import { useBooking } from "../context/BookingContext";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import styles from "./Booking.module.css";

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { setSelectedTrain, setSelectedWagon, selectedSeats, clearBooking } =
    useBooking();

  const train = trains.find((t) => t.id === Number(trainId));

  useEffect(() => {
    if (train) {
      setSelectedTrain(train);
      setSelectedWagon(null);
    } else {
      navigate("/");
    }
    return () => {
      // don't clear on unmount — keep state between re-renders
    };
  }, [train, setSelectedTrain, setSelectedWagon, navigate]);

  if (!train) return null;

  return (
    <main className={styles.page}>
      {/* Back nav */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <Link to="/" className={styles.backLink} id="back-to-home">
            ← Назад до рейсів
          </Link>
        </div>
      </div>

      {/* Train info header */}
      <div className={styles.trainHeader}>
        <div className={styles.container}>
          <div className={styles.trainMeta}>
            <span className={styles.trainNum}>🚂 Потяг №{train.number}</span>
            <div className={styles.routeDisplay}>
              <span className={styles.city}>{train.from}</span>
              <span className={styles.arrow}>
                ——— {train.duration} ———▶
              </span>
              <span className={styles.city}>{train.to}</span>
            </div>
            <div className={styles.timeMeta}>
              <span>
                🕐 Відправлення: <strong>{train.departureTime}</strong>
              </span>
              <span>
                🕐 Прибуття: <strong>{train.arrivalTime}</strong>
              </span>
              <span>
                📅{" "}
                {new Date(train.date).toLocaleDateString("uk-UA", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.layout}>
            {/* Left: wagon + seat selection */}
            <div className={styles.leftCol}>
              <WagonSelector wagons={train.wagons} />
              <SeatMap />
            </div>

            {/* Right: booking form */}
            <div className={styles.rightCol}>
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
