import { useBooking } from "../context/BookingContext";
import styles from "./WagonSelector.module.css";

const WAGON_ICONS = {
  Купе: "🚃",
  Плацкарт: "🚋",
  СВ: "🛏️",
  Люкс: "✨",
};

export default function WagonSelector({ wagons }) {
  const { selectedWagon, setSelectedWagon } = useBooking();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.tabs} role="tablist" aria-label="Вибір вагона">
        {wagons.map((wagon) => {
          const freeCount = wagon.seats.filter(
            (s) => s.status === "free"
          ).length;
          const isActive = selectedWagon?.id === wagon.id;

          return (
            <button
              key={wagon.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
              onClick={() => setSelectedWagon(wagon)}
              id={`wagon-tab-${wagon.id}`}
            >
              {/* Іконка зліва */}
              <span className={styles.wagonIcon}>
                {WAGON_ICONS[wagon.type] || "🚃"}
              </span>

              {/* Текстовий блок: назва + рядок з номером і бейджем */}
              <span className={styles.wagonInfo}>
                <span className={styles.wagonType}>{wagon.type}</span>
                <span className={styles.wagonMeta}>
                  <span className={styles.wagonNum}>Вагон {wagon.id}</span>
                  <span
                    className={`${styles.freeCount} ${freeCount < 5 ? styles.fewLeft : ""}`}
                  >
                    {freeCount} вільних
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
