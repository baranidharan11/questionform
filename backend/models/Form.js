// models/Form.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      options: [{ type: String }],
      type: {
        type: String,
        enum: ["single", "multiple"],
        default: "single",
      },
    },
  ],
});

module.exports = mongoose.model("Form", formSchema);
