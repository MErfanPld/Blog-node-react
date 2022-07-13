const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

const app = express();

dotenv.config();
// app.use(express.json);

// app.use(express.bodyParser({ limit: '50mb' }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* DataBase
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB ..."))
  .catch((err) => console.log(err));

//* Route
app.use("/api/auth", authRoute);

app.listen("5001", () => {
  console.log("Backend is running ...");
});
