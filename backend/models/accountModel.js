const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    required: true
  },

  accountNumber: {
    type: String,
    required: true,
    unique: true
  },

  accountType: {
    type: String,
    enum: ["Savings", "Current"]
  },

  balance: {
    type: Number,
    default: 0
  },

  branch: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("BankAccount", accountSchema);