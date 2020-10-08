var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserDataSchema = new Schema({
  PublickAddress: String,
  Nonce: Number,
  email: String,
  password: String,
  //   NickName: String,
  //   Rrn: Date,
  //   Gender: Boolean,
  //   CellNum: String,
  //   Address: String,
  //   Height: Number,
  //   Weight: Number,
});

module.exports = mongoose.model("UserData", UserDataSchema);
