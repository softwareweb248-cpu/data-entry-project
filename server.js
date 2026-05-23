const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("PASTE_YOUR_MONGODB_LINK_HERE")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const EntrySchema = new mongoose.Schema({
  date: String,
  description: String,
  rate: Number,
  qty: Number,
  amount: Number,
  company: String,
  project: String,
  partyName: String,
  partyNumber: String,
  givenPayment: Number,
  remainingPayment: Number,
  status: String,
  note: String
});

const Entry = mongoose.model("Entry", EntrySchema);

app.post("/save", async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

app.get("/entries", async (req, res) => {
  const data = await Entry.find();
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Running");
});