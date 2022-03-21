"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _sub = require("../controllers/sub.controller");

var _checkAuth = require("../middleware/check-auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _sub.saveSubs);
router.get('/', _checkAuth.checkAdminAuth, _sub.getAllSubs);
router.delete('/', _checkAuth.checkAdminAuth, _sub.unsubscribe);
var _default = router;
exports.default = _default;