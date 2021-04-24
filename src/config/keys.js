if (process.env.NODE_ENV === "production") {
  console.log("prodocting");
  module.exports = require("../config/prod");
} else {
  module.exports = require("../config/dev");
}
