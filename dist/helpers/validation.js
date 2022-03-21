"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subValidation = exports.registerValidation = exports.queriesValidation = exports.commentValidation = exports.blogValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerValidation = user => {
  const schema = _joi.default.object({
    firstName: _joi.default.string().min(5).required(),
    lastName: _joi.default.string().min(5).required(),
    email: _joi.default.string().email().required(),
    password: _joi.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    role: _joi.default.string().required()
  });

  return schema.validate(user);
};

exports.registerValidation = registerValidation;

const queriesValidation = query => {
  const schema = _joi.default.object({
    Name: _joi.default.string().min(5).required(),
    Message: _joi.default.string().max(30).required()
  });

  return schema.validate(query);
};

exports.queriesValidation = queriesValidation;

const blogValidation = blog => {
  const schema = _joi.default.object({
    title: _joi.default.string().min(5).required(),
    message: _joi.default.string().max(1000).required(),
    image: _joi.default.string()
  });

  return schema.validate(blog);
};

exports.blogValidation = blogValidation;

const commentValidation = comment => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(5).required(),
    comment: _joi.default.string().max(100).required()
  });

  return schema.validate(comment);
};

exports.commentValidation = commentValidation;

const subValidation = sub => {
  const schema = _joi.default.object({
    email: _joi.default.string().email().required()
  });

  return schema.validate(sub);
};

exports.subValidation = subValidation;