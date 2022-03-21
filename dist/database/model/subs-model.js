"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SubsSchema = _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  }
});

const Subs = _mongoose.default.model('Subs', SubsSchema);

var _default = Subs;
exports.default = _default;