const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const regex = require("regular-expressions");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);


app.use(bodyParser.json());


let serverStartTime = Date.now();

app.get("/server-status", (req, res) => {
  res.status(200).json({ serverStartTime });
});

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  const { query } = req.body;
  const { conversation } = req.body;
  // console.log(conversation)

  try {
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat(conversation.map((msg) => msg.text));

    const prompt = `Previous conversation:\n${conversation
      .map((msg) => `${msg.role}: ${msg.text}`)
      .join("\n")}\nUser: ${query}`;

      
    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    res.status(200).json({
      success: true,
      text: response.text(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating response" });
  }
});

app.listen(8000, () => console.log("Server listening on port 8000"));


// Please send data in bullet points  and without '\n' and '*' included in answer but do not mention that i have asked for response in bullet points in your answers



// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const { GoogleGenerativeAI, textGenerate } = require("@google/generative-ai");
// require("dotenv").config();

// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     credentials: true,
//   })
// );


// app.use(bodyParser.json());

// // Replace with your Gemini API key (stored securely in .env)

// const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Session Management Configuration
// // const oneDay = 24 * 60 * 60 * 1000; //milliseconds in a day
// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }, // One week
//   })
// );


// app.use(cors());
// app.use(bodyParser.json());

// app.post("/chat", async (req, res) => {
//   const { query } = req.body;
//   // console.log(query)

//   // Retrieve conversation history from session
//   let conversation = req.session.conversation || [];

//   console.log(req.session.conversation, 'session')

//   try {
//     const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const chat = model.startChat(conversation);

//     // Include some conversation history in the prompt (adjust as needed)
//     const prompt = `Previous conversation:\n${conversation
//       .slice(-3)
//       .join("\n")}\nYour query: ${query}`;

//     // console.log(prompt);

//     const result = await chat.sendMessage(prompt);
//     const response = await result.response;
//     // console.log(response.text());
//     conversation.push(query, response.text()); // Update conversation history

//     // Update session data with conversation history
//     req.session.conversation = conversation;

//     console.log(req.session.conversation);
//     res
//       .status(200)
//       .json({
//         success: true,
//         text: response.text(),
//         conversation: conversation,
//       });

//     // res.json({ text: response.text() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating response" });
//   }
// });

// app.get("/api/conversation", (req, res) => {
//   // Access the conversation history from user session (replace with your logic)
//   const conversation = req.session.conversation || [];
//   res.json({ conversation }); // Send conversation history in the response
// });

// app.listen(8000, () => console.log("Server listening on port 8000"));








