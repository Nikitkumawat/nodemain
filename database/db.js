const mongoose = require("mongoose");
// const url =
//   "mongodb+srv://kumawatnikit66:b2LSgdH5yY5B6Mw7@productmain.jdz6uoo.mongodb.net/";

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

module.exports = { connectToMongoDB };
