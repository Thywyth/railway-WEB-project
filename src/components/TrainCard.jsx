import { useNavigate } from "react-router-dom";
import styles from "./TrainCard.module.css";

export default function TrainCard({ train }) {
  const navigate = useNavigate();

  const freeSeatsCount = train.wagons.reduce((acc, wagon) => {
    return acc + wagon.seats.filter((s) => s.status === "free").length;
  }, 0);

  const wagonTypes = [...new Set(train.wagons.map((w) => w.type))];

  return (
    <article className={styles.card} aria-label={`Потяг ${train.number}`}>
      <div className={styles.trainBadge}>
        <span className={styles.trainIcon}>🚂</span>
        <span className={styles.trainNumber}>№ {train.number}</span>
      </div>

      <div className={styles.routeSection}>
        <div className={styles.city}>
          <span className={styles.cityName}>{train.from}</span>
          <span className={styles.time}>{train.departureTime}</span>
        </div>

        <div className={styles.routeArrow}>
          <div className={styles.arrowLine}></div>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.arrowHead}>▶</div>
        </div>

        <div className={`${styles.city} ${styles.cityRight}`}>
          <span className={styles.cityName}>{train.to}</span>
          <span className={styles.time}>{train.arrivalTime}</span>
        </div>
      </div>

      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>📅 Дата</span>
          <span className={styles.metaValue}>
            {new Date(train.date).toLocaleDateString("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>🚃 Вагони</span>
          <span className={styles.metaValue}>{wagonTypes.join(", ")}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>💺 Вільно</span>
          <span
            className={`${styles.metaValue} ${freeSeatsCount < 10 ? styles.lowSeats : ""}`}
          >
            {freeSeatsCount} місць
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>від</span>
          <span className={styles.price}>{train.price} ₴</span>
        </div>
        <button
          className={styles.btn}
          onClick={() => navigate(`/booking/${train.id}`)}
          id={`select-seats-${train.id}`}
        >
          Обрати місця →
        </button>
      </div>
    </article>
  );
}
