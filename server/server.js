const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const fundRoutes = require("./routes/fundRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/funds", fundRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log("Server running")))
  .catch(err => console.log(err));