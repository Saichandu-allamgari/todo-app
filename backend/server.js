require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(cors(
  {
  origin: "https://todo-list-apn2.netlify.app",
  credentials: true , // ✅ Allow credentials for session-based authentication
  // methods: "GET,POST, PUT, DELETE",
  // allowedHeaders: ["Content-Type", "Authorization"]
}
));



app.use(( req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   cookie: {
//     secure: process.env.NODE_ENV === "production",  // Only secure in production
//     httpOnly: true,
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
//   }
// }));


// app.use((req, res, next) => {
//   console.log(`➡️ [${req.method}] ${req.url}`);
//   next();
// });


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log( `Server running on port ${PORT}`));
