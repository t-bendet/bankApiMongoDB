const mongoose = require("mongoose");
const { MONGOODB_KEY } = require("../config/keys");

const uri = `mongodb+srv://${MONGOODB_KEY}@cluster0.ogtpo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connectedâ€¦");
  })
  .catch((err) => console.log(err));
