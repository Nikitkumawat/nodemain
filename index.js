const express = require("express");
const { type } = require("os");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const { connectToMongoDB } = require("./database/db");
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publiceKey = fs.readFileSync("./public.key", "utf-8");

// body Parser
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, publiceKey);
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401).json({
      error: err.message,
    });
  }
};
app.use(express.json());
app.use("/auth", authRouter.router);
app.use("/products", auth, productRouter.router);
app.use("/users", auth, userRouter.router);

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost: ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Error occurred in mongodb connection", err));
