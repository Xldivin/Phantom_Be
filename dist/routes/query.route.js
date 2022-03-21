"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _query = require("../controllers/query.controller");

var _checkAuth = require("../middleware/check-auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _query.saveQuery);
router.get('/', _checkAuth.checkAdminAuth, _query.getAllQuery);
router.get('/:id', _checkAuth.checkAdminAuth, _query.getById);
router.delete('/:id', _checkAuth.checkAdminAuth, _query.deleteQueryById);
var _default = router;
exports.default = _default;