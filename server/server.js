// server side - backend
console.log("hello world");

import express from "express"; // import express from the Express module that was installed
import cors from "cors"; // import cors from the CORS module that was installed

const app = express(); // creating an app using the express object
const PORT = 5000; // specifying the port number
app.use(express.json()); // accept json in requests
app.use(cors()); // allows client to communicate with the server without it being blocked

app.get("/", (req, res) => { //root endpoint
  res.json("This is the root route");
});

// app.post("/message", (req, res) => {
//     const newMessage = req.body;
//     // this console log will appear in the terminal because that is where the server is running
//     console.log(newMessage);

//     // here is the response. At the moment we are just sending back what the client sent with their own request
//     res.json(newMessage)
// })

app.post("/message", (req, res) => {
  console.log("req.body", req.body);
  res.json({ status: "Message received!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

