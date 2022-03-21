"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { string } from "@hapi/joi";
const QuerySchema = new _mongoose.default.Schema({
  Name: {
    type: String,
    required: true
  },
  Message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Query = _mongoose.default.model('Query', QuerySchema);

var _default = Query;
exports.default = _default;