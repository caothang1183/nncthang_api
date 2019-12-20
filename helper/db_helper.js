const mongoose = require("mongoose");

const connectDB = function() {
  const db = require("../config/keys").MongoURI;
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
};

module.exports.connectDB = connectDB;
