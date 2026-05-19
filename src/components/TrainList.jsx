import TrainCard from "./TrainCard";
import styles from "./TrainList.module.css";

export default function TrainList({ trains }) {
  if (!trains || trains.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <p className={styles.emptyText}>Рейсів не знайдено</p>
        <p className={styles.emptyHint}>
          Спробуйте змінити параметри пошуку або оберіть іншу дату
        </p>
      </div>
    );
  }

  return (
    <section className={styles.list} aria-label="Список рейсів">
      <p className={styles.count}>Знайдено рейсів: {trains.length}</p>
      <div className={styles.grid}>
        {trains.map((train) => (
          <TrainCard key={train.id} train={train} />
        ))}
      </div>
    </section>
  );
}
