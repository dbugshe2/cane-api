const express = require("express");
const bodyParser = require("body-parser");
// const cors = require('cors');
// const helmet = require('helmet');
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const canesRoutes = require("./src/routes/canes");
const usersRoutes = require("./src/routes/canes");

mongoose.connect(
  `mongodb+srv://dbUser:${process.env.MONGO_ATLAS_PW}@dmadmin-pla3i.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("were connecting");
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-REquest-With, Content-Type, Accespt, Authorization"
  );
  if (req.methods === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }
  next();
});

app.use("/canes", canesRoutes);

app.use("/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
