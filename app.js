const express = require("express");
const cors = require("cors");
const ipRoutes = require("./src/routes/ipRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", ipRoutes);

module.exports = { app };
