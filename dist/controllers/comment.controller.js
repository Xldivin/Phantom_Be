"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveComment = exports.getComment = exports.getById = exports.deleteCommentById = void 0;

var _comment = _interopRequireDefault(require("../database/model/comment.model"));

var _validation = require("../helpers/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveComment = async (req, res) => {
  const comment = req.body;
  const {
    error
  } = (0, _validation.commentValidation)(comment);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const newComment = new _comment.default(comment);
  await newComment.save();
  res.status(201).json({
    status: "success",
    data: newComment
  });
};

exports.saveComment = saveComment;

const getComment = async (req, res) => {
  const comment = await _comment.default.find();
  res.status(200).json({
    status: "success",
    data: comment
  });
};

exports.getComment = getComment;

const getById = async (req, res) => {
  const {
    id
  } = req.params;
  const comment = await _comment.default.findById(id);
  if (!comment) return res.status(404).send;
  res.status(200).json({
    status: "success",
    data: comment
  });
};

exports.getById = getById;

const deleteCommentById = async (req, res) => {
  const {
    id
  } = req.params;
  const comment = await _comment.default.findById(id);
  if (!comment) return res.status(404).json({
    status: "fail",
    message: "comment not found"
  });
  await _comment.default.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "comment deleted"
  });
};

exports.deleteCommentById = deleteCommentById;