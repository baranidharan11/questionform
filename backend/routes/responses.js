// backend/routes/responses.js
const express = require("express");
const {
  submitResponse,
  getResponsesByFormId,
} = require("../controllers/responses");

const router = express.Router();

router.post("/", submitResponse);
router.get("/:formId", getResponsesByFormId);

module.exports = router;
