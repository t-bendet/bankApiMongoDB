const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const bankRouter = require("./routers/bank");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bankRouter);
app.use(cors);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
