"use strict";

var _app = _interopRequireDefault(require("./app"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT;

_app.default.listen(port || 3000, () => {
  console.log("Server listening on port " + port);
});