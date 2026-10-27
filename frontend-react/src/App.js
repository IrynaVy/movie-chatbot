import { useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("https://movie-chatbot-4-ic37.onrender.com/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input })
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Помилка з'єднання з сервером." }
      ]);
    }

    setInput("");
  };

  return (
    <div className="page-container">
      <h1>🎬 Movie Chatbot</h1>

      <div className="content-wrapper">
        <div className="chat-section">
          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введіть повідомлення..."
            />
            <button onClick={sendMessage}>Надіслати</button>
          </div>
        </div>

        <div className="form-section">
          <ContactForm />
        </div>
      </div>
    </div>
  );

}

export default App;
