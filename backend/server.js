const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message:
    "Too many login/signup attempts from this IP, please try again later.",
});
app.use("/api/auth", authLimiter, require("./routes/auth"));

app.use("/api/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.send("Blog API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
