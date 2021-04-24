const mongoose = require("mongoose");
const validator = require("validator");

const Client = mongoose.model("Client", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "he-IL")) {
        throw new Error("phone number most be a valid isrealy phone number");
      }
    },
  },
});

module.exports = Client;
