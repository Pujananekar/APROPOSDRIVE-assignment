const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/testdb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", UserSchema);

// Insert data
app.post("/add", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("Data inserted successfully ✅");
});

// Fetch data
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("App running + DB connected 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

