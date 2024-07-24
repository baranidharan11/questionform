const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://admin:admin000@atlascluster.bdvohkm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
  )
  .then(() => console.log("mongo db connected..."))
  .catch((e) => console.error("error in mongo connection", e));

// Routes
app.use("/api/forms", require("./routes/forms"));
app.use("/api/responses", require("./routes/responses"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
