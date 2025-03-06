import { useState } from "react";
import axios from "axios";

const API_URL = "https://socialspherehub.onrender.com/chat"; // Replace with your actual backend URL

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(API_URL, { message: input });

            const botMessage = { sender: "bot", text: res.data.response };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error fetching AI response", error);
            setMessages(prevMessages => [...prevMessages, { sender: "bot", text: "Error: Unable to connect to AI." }]);
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Chat with AI Coach</h2>
            <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "200px", marginBottom: "10px" }}>
                {messages.map((msg, i) => (
                    <p key={i} style={{ color: msg.sender === "user" ? "blue" : "green" }}>
                        <strong>{msg.sender === "user" ? "You: " : "Coach: "}</strong>
                        {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px" }} disabled={loading}>
                {loading ? "Thinking..." : "Send"}
            </button>
        </div>
    );
}

export default Chat;

