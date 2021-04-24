const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const bankRouter = require("./routers/bank");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./index.js")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.js"));
});

app.use(express.json());
app.use(bankRouter);
app.use(cors);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
