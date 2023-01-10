const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  vipClient: {
    type: Boolean,
    required: true,
  },
  amountSpent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("client", clientSchema);
