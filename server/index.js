require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./routes/User");
const helmet = require("helmet");
const bodyParser = require("body-parser");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", User);
app.use((err, req, res, next) => res.status(err.code).json(err));
app.listen(process.env.PORT || 3000, () =>
  console.log("Example app listening on port 3000!")
);
