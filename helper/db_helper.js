const mongoose = require("mongoose");
const database = require("../config/API");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

module.exports.connectMongoDB = function() {
  mongoose
    .connect(database.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
};

module.exports.connectMlabDB = function() {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(database.mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
};

