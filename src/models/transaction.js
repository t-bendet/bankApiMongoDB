const mongoose = require("mongoose");
const validator = require("validator");
const Client = require("./client");

const Transaction = mongoose.model("Transaction", {
  sum: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Sum must be a positive number");
      }
    },
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  accountId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    default: "no comment",
  },
});

module.exports = Transaction;
