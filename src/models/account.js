const mongoose = require("mongoose");
const validator = require("validator");

const Account = mongoose.model("Account", {
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = Account;
