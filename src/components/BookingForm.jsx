import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useBooking } from "../context/BookingContext";
import { BookingService } from "../services/BookingService";
import styles from "./BookingForm.module.css";

const PHONE_REGEX = /^\+?[\d\s\-]{10,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errors = {};
  if (!fields.name || fields.name.trim().length < 2) {
    errors.name = "Ім'я має містити мінімум 2 символи";
  }
  if (!fields.phone || !PHONE_REGEX.test(fields.phone.trim())) {
    errors.phone = "Введіть коректний номер телефону (мін. 10 цифр)";
  }
  if (!fields.email || !EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = "Введіть коректну адресу електронної пошти";
  }
  return errors;
}

export default function BookingForm() {
  const { selectedTrain, selectedWagon, selectedSeats, clearBooking } =
    useBooking();
  const navigate = useNavigate();

  const [fields, setFields] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    selectedSeats.length > 0 && !submitting && selectedWagon && selectedTrain;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const booking = {
      passengerName: fields.name.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim(),
      trainId: selectedTrain.id,
      trainNumber: selectedTrain.number,
      route: `${selectedTrain.from} → ${selectedTrain.to}`,
      date: selectedTrain.date,
      departureTime: selectedTrain.departureTime,
      arrivalTime: selectedTrain.arrivalTime,
      wagonId: selectedWagon.id,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      totalPrice: selectedTrain.price * selectedSeats.length,
      bookedAt: new Date().toISOString(),
    };

    BookingService.saveBooking(booking);

    toast.success(
      `✅ Бронювання успішне! Квитки на ${selectedTrain.from} → ${selectedTrain.to} збережено.`,
      { position: "top-center", autoClose: 4000 }
    );

    clearBooking();
    setFields({ name: "", phone: "", email: "" });
    setErrors({});
    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Дані пасажира</h3>

      {!canSubmit && selectedSeats.length === 0 && (
        <div className={styles.notice}>
          ℹ️ Оберіть хоча б одне місце, щоб продовжити бронювання
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        id="booking-form"
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor="booking-name">
            Повне ім'я *
          </label>
          <input
            id="booking-name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="Іваненко Іван Іванович"
            autoComplete="name"
          />
          {errors.name && (
            <span className={styles.error} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="booking-phone">
            Телефон *
          </label>
          <input
            id="booking-phone"
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            placeholder="+380 67 123 4567"
            autoComplete="tel"
          />
          {errors.phone && (
            <span className={styles.error} role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="booking-email">
            Email *
          </label>
          <input
            id="booking-email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            autoComplete="email"
          />
          {errors.email && (
            <span className={styles.error} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {selectedSeats.length > 0 && selectedTrain && (
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Квитків:</span>
              <strong>{selectedSeats.length}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Ціна за квиток:</span>
              <strong>{selectedTrain.price} ₴</strong>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Разом:</span>
              <strong>{selectedTrain.price * selectedSeats.length} ₴</strong>
            </div>
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canSubmit}
          id="submit-booking"
        >
          {submitting ? "Обробка..." : "🎫 Забронювати квитки"}
        </button>
      </form>
    </div>
  );
}
