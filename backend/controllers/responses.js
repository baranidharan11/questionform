// backend/controllers/responsesController.js
const Response = require("../models/Response");

exports.submitResponse = async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getResponsesByFormId = async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
