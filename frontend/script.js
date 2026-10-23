const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    fetch("https://movie-chatbot-seven.vercel.app/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
        addMessage(data.reply, "bot");
    })
    .catch(err => {
        addMessage("Помилка з'єднання з сервером.", "bot");
    });
}

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

const userForm = document.getElementById("userForm");

if (userForm) {
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    // LocalStorage
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);

    // SessionStorage
    sessionStorage.setItem("lastMessage", data.message);

    const res = await fetch("https://movie-chatbot-zzlw.onrender.com/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById("status").innerText = result.message;
  });
}
