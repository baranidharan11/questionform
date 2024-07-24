// backend/models/Response.js
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form.questions",
        required: true,
      },
      selectedOptions: [{ type: String }],
    },
  ],
});

module.exports = mongoose.model("Response", responseSchema);
