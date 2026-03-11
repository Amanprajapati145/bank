const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
connectDB();

// routes
app.use("/api", accountRoutes);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});