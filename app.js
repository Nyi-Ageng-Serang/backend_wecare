require("dotenv").config();
const cors = require('cors');
const express = require("express");
const db = require("./db");
const routes = require("./routes/index");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
