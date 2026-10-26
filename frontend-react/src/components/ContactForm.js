import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Дані надіслано:\nІм'я: ${name}\nEmail: ${email}\nПовідомлення: ${message}`);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Зв'язок з нами</h2>

      <input
        type="text"
        placeholder="Ваше ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Ваш Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <textarea
        placeholder="Ваше повідомлення"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Надіслати</button>
    </form>
  );
}
