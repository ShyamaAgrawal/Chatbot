import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import "./CSS/Chatbot.css";
import bot from "../assets/robot.png";
import send from "../assets/send.png";


const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(
    JSON.parse(localStorage.getItem("conversation")) || [
      { role: "bot", text: "How can i help you?" },
    ]
  );
  const [isTyping, setIsTyping] = useState(false)

  // console.log(conversation)

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/server-status`);
        const serverStartTime = data.serverStartTime;
        const storedStartTime = localStorage.getItem("serverStartTime");

        if (storedStartTime !== serverStartTime.toString()) {
          localStorage.clear();
          localStorage.setItem("serverStartTime", serverStartTime);
          setConversation([{ role: "bot", text: "How can i help you?" }]);
        }
      } catch (error) {
        console.error("Error checking server status:", error);
      }
    };

    checkServerStatus();
  }, []);

  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);



  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      alert("Please enter a message");
      return;
    }
    try {
      const updatedConversation = [
        ...conversation,
        { role: "user", text: `${message}` },
      ];
      setConversation(updatedConversation);
      setIsTyping(true)

      const { data } = await axios.post(`${BASE_URL}/chat`, {
        query: message,
        conversation: conversation,
      });

      const updatedConversation2 = [
        ...conversation,
        { role: "user", text: message },
        { role: "bot", text: data.text },
      ];
      setConversation(updatedConversation2);
      setIsTyping(false)

      localStorage.setItem("conversation", JSON.stringify(updatedConversation));
      setMessage("");
      // console.log(conversation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="chatbot">
        <div className="chat-top">
          <div>
            <img src={bot} alt="" className="botLogo" />
          </div>
          <div className="bot-intro">
            <p>Chat with</p>
            <h2>Chatbot</h2>
            <p style={{margin:'0',marginBottom:'5px',color:isTyping?"lightgreen":"pink"}}>{ isTyping && '...typing'}</p>
          </div>
        </div>
        <div className="chat-mid">
          {conversation.map((msg, index) => (
            <div key={index}>
              {/* <strong>{msg.role === "user" ? "User" : "Bot"}:</strong>
              {" "} */}
              <p className={msg.role === "user" ? "User" : "Bot"}>{msg.text}</p>
            </div>
          ))}
        </div>
          <footer className="footer">
            <form onSubmit={sendMessage}>
              <div className="foot">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-inp"
                  placeholder="Enter your message..."
                />
              <button className="btn" type="submit">
                <img src={send} alt="" style={{width:'25px', height:'25px'}} />
              </button>
              </div>
            </form>
          </footer>
      </div>
    </div>
  );
};

export default Chatbot;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [message, setMessage] = useState("");
//   const [conversation, setConversation] = useState([]); // Stores messages

//   // Function to send user messages and update UI
//   const sendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("http://localhost:8000/chat", {
//         query: message,
//       });
//       console.log(data)
//       setConversation([...conversation, message, data.text]);
//       console.log(conversation,'convo')
//       setMessage("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     // Optional: Fetch initial conversation history from session on mount
//     const fetchHistory = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:8000/api/conversation"
//         ); // Example API route
//         setConversation(data.conversation || []); // Use default if no history
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchHistory();
//   }, []); // Runs only on component mount

//   // ... other component logic

//   return (
//     <div className="chatbot">
//       <ul>
//         {" "}
//         {/* Display conversation history */}
//         {conversation.map((message,index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;
