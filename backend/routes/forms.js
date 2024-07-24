// backend/routes/forms.js
const express = require("express");
const {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} = require("../controllers/forms");

const router = express.Router();

router.post("/create", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

module.exports = router;
