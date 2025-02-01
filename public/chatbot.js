// Create a floating button
const chatbotButton = document.createElement("button");
chatbotButton.id = "chatbot-button";
chatbotButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
`;
chatbotButton.style.position = "fixed";
chatbotButton.style.bottom = "100px";
chatbotButton.style.right = "70px";
chatbotButton.style.width = "50px";
chatbotButton.style.height = "50px";
chatbotButton.style.backgroundColor = "#6D28D9";
chatbotButton.style.color = "white";
chatbotButton.style.border = "none";
chatbotButton.style.borderRadius = "50%";
chatbotButton.style.cursor = "pointer";
chatbotButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
chatbotButton.style.display = "flex";
chatbotButton.style.alignItems = "center";
chatbotButton.style.justifyContent = "center";
chatbotButton.style.zIndex = "9999";
document.body.appendChild(chatbotButton);

// Create the chatbot container
const chatbotContainer = document.createElement("div");
chatbotContainer.id = "chatbot-container";
chatbotContainer.style.position = "fixed";
chatbotContainer.style.bottom = "160px";
chatbotContainer.style.right = "90px";
chatbotContainer.style.width = "300px";
chatbotContainer.style.backgroundColor = "white";
chatbotContainer.style.border = "1px solid #ccc";
chatbotContainer.style.borderRadius = "8px";
chatbotContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
chatbotContainer.style.display = "none";
document.body.appendChild(chatbotContainer);

// Chatbot UI
chatbotContainer.innerHTML = `
  <div style="padding: 16px; height: 300px; overflow-y: auto;">
    <div style="text-align: center; margin-bottom: 16px;">Beyonder</div>
    <div id="chatbot-messages"></div>
  </div>
  <div style="padding: 16px; border-top: 1px solid #ccc;">
    <input type="text" id="chatbot-input" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Type a message..." />
  </div>
`;

chatbotButton.addEventListener("click", () => {
  if (chatbotContainer.style.display === "none") {
    chatbotContainer.style.display = "block";
  } else {
    chatbotContainer.style.display = "none";
  }
});

const input = document.getElementById("chatbot-input");
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const message = e.target.value;
    e.target.value = "";

    const messages = document.getElementById("chatbot-messages");
    messages.innerHTML += `<div style="text-align: right; margin-bottom: 8px;">${message}</div>`;

    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          messages.innerHTML += `<div style="text-align: left; margin-bottom: 8px;">${data.reply}</div>`;
        }
      });
  }
});
