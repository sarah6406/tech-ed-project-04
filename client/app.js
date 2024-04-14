//client side - frontend
const form = document.getElementById("message-form");
const appendedMessages = document.getElementById("appended-messages");

//handling event on button click
async function handleSubmit(e) {
  e.preventDefault(); // if event does not get explicitly handled (is the following allowing for explicit handling??), default action should not be taken as it normally would be
  const username = e.target.username.value;
  const message = e.target.message.value;

  //   console.log({
  //     username: username,
  //     message: message,
  //   });

  //make a request to the server with our form data as the body
  const response = await fetch("http://localhost:5000/getmessage", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      message: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await response.json());
  appendMessagesToUI();
  form.reset();
}

// function for getting messages to append messages to ul from api
async function appendMessagesToUI() {
  const response = await fetch("http://localhost:5000/getmessage");
  const messages = await response.json();
  console.log(messages);

  appendedMessages.innerHTML = "";

  //put messages onto the page
  messages.forEach((message) => {
    const h2 = document.createElement("h2"); // username
    const p = document.createElement("p"); // message
    h2.textContent = `${message.username} says...`;
    p.textContent = message.message;
    h2.style.fontStyle = "italic";
    appendedMessages.appendChild(h2); // appending h2 to div .appendedMessages
    appendedMessages.appendChild(p); // appending p to div .appendedMessages
  });
}

form.addEventListener("submit", handleSubmit);
appendMessagesToUI();

// // tim's code for reference
// const gamesWrapper = document.getElementById("gamesWrapper");

// // get the games from my api
// async function getGames() {
//   const response = await fetch("http://localhost:8080/games");
//   const games = await response.json();
//   console.log(games);

//   // put the games onto the page
//   games.forEach(function (game) {
//     // DOM manipulation to put the games onto the html
//     const h2 = document.createElement("h2");
//     const p = document.createElement("p");
//     const img = document.createElement("img");

//     h2.textContent = game.title;
//     p.textContent = `Came out in ${game.year}`;
//     img.src = game.imgUrl;
//     img.alt = game.title;

//     gamesWrapper.appendChild(h2);
//     gamesWrapper.appendChild(p);
//     gamesWrapper.appendChild(img);
//   });
// }

// getGames();
