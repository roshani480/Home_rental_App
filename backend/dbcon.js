const mongoose = require("mongoose");

const mongodbConnection = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("mongodb connected");
  } catch (error) {
    console.log("error detected", error);
  }
};

module.exports = mongodbConnection;
