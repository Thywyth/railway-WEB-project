import { useState, useMemo } from "react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";
import styles from "./Home.module.css";

const CITIES = [...new Set(trains.flatMap((t) => [t.from, t.to]))].sort();

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return trains.filter((train) => {
      const matchQuery =
        !q ||
        train.number.toLowerCase().includes(q) ||
        train.from.toLowerCase().includes(q) ||
        train.to.toLowerCase().includes(q);

      const matchFrom = !filterFrom || train.from === filterFrom;
      const matchTo = !filterTo || train.to === filterTo;
      const matchDate = !filterDate || train.date === filterDate;

      return matchQuery && matchFrom && matchTo && matchDate;
    });
  }, [searchQuery, filterFrom, filterTo, filterDate]);

  const handleReset = () => {
    setSearchQuery("");
    setFilterFrom("");
    setFilterTo("");
    setFilterDate("");
  };

  const hasFilters = searchQuery || filterFrom || filterTo || filterDate;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-label="Пошук рейсів">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🚄 УкрЗалізниця</div>
          <h1 className={styles.heroTitle}>
            Залізничні квитки
            <span className={styles.heroAccent}> онлайн</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Знайдіть та забронюйте квиток на потяг за кілька секунд
          </p>
        </div>

        {/* Search panel */}
        <div className={styles.searchPanel}>
          <div className={styles.searchRow}>
            <div className={styles.searchField}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                id="search-query"
                type="text"
                className={styles.searchInput}
                placeholder="Пошук за номером, містом..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Пошук рейсів"
              />
            </div>
          </div>

          <div className={styles.filtersRow}>
            <select
              id="filter-from"
              className={styles.select}
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
              aria-label="Місто відправлення"
            >
              <option value="">📍 Звідки</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              id="filter-to"
              className={styles.select}
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
              aria-label="Місто призначення"
            >
              <option value="">📍 Куди</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              id="filter-date"
              type="date"
              className={styles.dateInput}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              aria-label="Дата відправлення"
            />

            {hasFilters && (
              <button
                className={styles.resetBtn}
                onClick={handleReset}
                id="reset-filters"
              >
                ✕ Скинути
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Train list */}
      <section className={styles.listSection}>
        <div className={styles.container}>
          <TrainList trains={filtered} />
        </div>
      </section>
    </main>
  );
}
