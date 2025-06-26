// frontend/script.js
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };
  
    const response = await fetch("https://uqra68efz9.execute-api.us-east-1.amazonaws.com/prod/contact", {
      method: "POST",
      body: JSON.stringify(data)
    });
  
    document.getElementById("status").innerText =
      response.ok ? "Message sent!" : "Error sending message.";
  });
  