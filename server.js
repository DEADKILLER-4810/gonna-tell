import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/messagesDB");

const messageSchema = new mongoose.Schema({
  text: String,
  time: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// 🔹 Route to save message
app.post("/send", async (req, res) => {
  try {
    const { message } = req.body;
    const newMsg = new Message({ text: message });
    await newMsg.save();
    res.json({ msg: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving message!" });
  }
});

// 🔹 Route to get all messages (optional, for testing)
app.get("/messages", async (req, res) => {
  try {
    const allMessages = await Message.find().sort({ time: -1 });
    res.json(allMessages);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching messages!" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
