import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/messagesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    res.status(500).json({ msg: "Error saving message!" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
