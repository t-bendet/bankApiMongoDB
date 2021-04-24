if (process.env.NODE_ENV === "production") {
  console.log("prodoctin");
  module.exports = require("../config/prod");
} else {
  module.exports = require("../config/dev");
}
