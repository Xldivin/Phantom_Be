"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("./database");

var _query = _interopRequireDefault(require("./routes/query.route"));

var _blog = _interopRequireDefault(require("./routes/blog.route"));

var _auth = _interopRequireDefault(require("./routes/auth.route"));

var _sub = _interopRequireDefault(require("./routes/sub.route"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _doc = _interopRequireDefault(require("./doc.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//swagger-ui
const server = (0, _express.default)();
server.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "hurray!! server is on"
  });
});
server.use(_express.default.json());
server.use('/api/v1/query', _query.default);
server.use('/api/v1/blog', _blog.default);
server.use('/api/v1/auth', _auth.default);
server.use('/api/v1/subs', _sub.default);
var _default = server;
exports.default = _default;
server.use((0, _cors.default)());
server.use((0, _morgan.default)("dev"));
server.use("/api/v1/", _auth.default);
server.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_doc.default, {
  explorer: true
}));
server.use("*", (req, res, next) => {
  res.status(404).json({
    error: "NOT FOUND"
  });
});