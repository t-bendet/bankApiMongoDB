const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const bankRouter = require("./routers/bank");

const app = express();
const port = 3000;

app.use(express.json());
app.use(bankRouter);
app.use(cors);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
