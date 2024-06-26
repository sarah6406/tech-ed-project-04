// server side - backend
console.log("hello world");
import Database from "better-sqlite3";
import express from "express"; // import express from the Express module that was installed
import cors from "cors"; // import cors from the CORS module that was installed

const db = new Database("database.db");
const app = express(); // creating an app using the express object
const PORT = 5000; // specifying the port number
app.use(express.json()); // accept json in requests
app.use(cors()); // allows client to communicate with the server without it being blocked

app.get("/", (req, res) => {
  //root endpoint
  res.json("This is the root route");
});

// app.post("/message", (req, res) => {
//   const newMessage = req.body;
//   // this console log will appear in the terminal because that is where the server is running
//   console.log(newMessage);
//   //insert into database here... function

//   // here is the response. At the moment we are just sending back what the client sent with their own request
//   res.json(newMessage);
// });

// data for testing purposes on get request
// const messages = [
//   { username: "sarah123", message: "Hello, world!" },
//   { username: "bob", message: "Testing, testing, 123. " },
// ];

// add app.get("/getmessage") -- function to query database for all messages and return them

// function to try and append messages to the browser window!!!
// function insertMessageFunction() {
//   const newMessage = db
//     .prepare("INSERT INTO comments (username, message) VALUES (?, ?)")
//     .run(messageToAppend.username, messageToAppend.message);
//   console.log(newMessage);
// }
// const insertMessage = insertToDB.run(
//   messageToAppend.username,
//   messageToAppend.message
// );
// insertMessage();

function appendMessagesFromDB() {
  const messagesToAppend = db.prepare(`SELECT * FROM comments`).all();
  return messagesToAppend;
}

app.get("/getmessage", (req, res) => {
  const comments = appendMessagesFromDB();
  res.json(comments);
  console.log(comments);
  // res.json(req.body);
});

app.post("/getmessage", (req, res) => {
  const messageToAppend = req.body;
  // insert new message into database using data from req.body
  function insertMessage() {
    const newMessage = db
      .prepare("INSERT INTO comments (username, message) VALUES (?, ?)")
      .run(messageToAppend.username, messageToAppend.message);
    console.log(newMessage);
  }
  //   const insertMessage = insertToDB.run(username, message);

  console.log(messageToAppend);
  insertMessage();
  res.json(messageToAppend);
});

// app.post("/message", (req, res) => {
//   console.log("req.body", req.body);
//   res.json({ status: "Message received!" }); // this is seen in postman when we do a POST request on localhost:5000/message - we will only see GET requests on the webpage
// });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
