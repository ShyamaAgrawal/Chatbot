
//***************************************** */



// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const { GoogleGenerativeAI, textGenerate } = require("@google/generative-ai");
// require("dotenv").config();

// const app = express();

// app.use(bodyParser.json());

// // Replace with your Gemini API key (stored securely in .env)

// const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Session Management Configuration
// const oneDay = 24 * 60 * 60 * 1000; //milliseconds in a day
// app.use(
//   session({
//     secret: "your_secret_key", // Replace with a strong secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: oneDay }, // Set appropriate cookie settings
//   })
// );

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/chat", async (req, res) => {
//   const { query } = req.body;
//   // console.log(query)

//   // Retrieve conversation history from session
//   let conversation = req.session.conversation || [];

//   try {
//     const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Include some conversation history in the prompt (adjust as needed)
//     const prompt = `Previous conversation:\n${conversation
//       .slice(-3)
//       .join("\n")}\nYour query: ${query}`;

//     console.log(prompt);

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     console.log(response.text());
//     conversation.push(query, response.text()); // Update conversation history

//     // Update session data with conversation history
//     req.session.conversation = conversation;

//     console.log(conversation);

//     res.json({ text: response.text() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error generating response" });
//   }
// });

// app.listen(8000, () => console.log("Server listening on port 8000"));
