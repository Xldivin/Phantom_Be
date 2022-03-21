"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Blogchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  inquiry: [{
    name: {
      type: String,
      required: true
    },
    inquiry: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  }]
});

const Blog = _mongoose.default.model('Blog', Blogchema);

var _default = Blog;
exports.default = _default;