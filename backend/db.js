const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectDB = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
