import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ use environment variable instead of hardcoded string
mongoose.connect(process.env.MONGO_URI);

const messageSchema = new mongoose.Schema({
  text: String,
  time: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

app.post("/send", async (req, res) => {
  try {
    const { message } = req.body;
    const newMsg = new Message({ text: message });
    await newMsg.save();
    res.json({ msg: "Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Error saving message!" });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const allMessages = await Message.find().sort({ time: -1 });
    res.json(allMessages);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching messages!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
