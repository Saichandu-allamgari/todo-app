require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ["https://todo-list-apn2.netlify.app"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true  // ✅ Allow credentials
}));
app.use(express.json());


app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  console.error("🔥 Backend Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });

  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: true, httpOnly: true, sameSite: "none" }
}));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log( `Server running on port ${PORT}`));