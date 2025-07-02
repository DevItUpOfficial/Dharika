require("dotenv-safe").config({
  example: require("path").resolve(__dirname, ".env.example"),
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const app = express();


app.use(
  cors({
    origin: "http://localhost:5500", //Bro we will change this to the actual client URL later
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

app.use(express.json());

require("./src/models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/auth", require("./src/routes/authRoutes")); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
