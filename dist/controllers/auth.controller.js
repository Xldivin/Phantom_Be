"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userProfile = exports.signup_post = exports.login_post = void 0;

var _user = _interopRequireDefault(require("../database/model/user.model"));

var _hashPassword = require("../helpers/hash-password");

var _jwt = require("../helpers/jwt");

var _validation = require("../helpers/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signup_post = async (req, res) => {
  let user = req.body;
  const {
    error
  } = (0, _validation.registerValidation)(user);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  user.password = await (0, _hashPassword.hash)(user.password);
  const usermail = await _user.default.findOne({
    email: req.body.email
  });

  if (usermail) {
    return res.status(409).json({
      status: "success",
      message: "user already in please login"
    });
  }

  const newUser = await new _user.default(user);
  newUser.save();
  res.status(201).json({
    status: "success",
    data: newUser
  });
};

exports.signup_post = signup_post;

const login_post = async (req, res) => {
  const {
    password,
    email
  } = req.body;
  let user = await _user.default.findOne({
    email
  });
  if (!user) return res.status(401).json({
    status: "fail",
    message: "not in in "
  });
  const isPasswordValid = await (0, _hashPassword.verify)(user.password, password);
  if (!isPasswordValid) return res.status(401).json({
    status: "fail",
    message: "wrong password"
  });
  const {
    _id,
    firstName,
    lastName,
    role
  } = user;
  const token = (0, _jwt.signToken)(JSON.stringify({
    _id,
    firstName,
    lastName,
    role,
    email: user.email
  }));
  return res.status(200).json({
    status: "success",
    message: "successfully logged in",
    token
  });
};

exports.login_post = login_post;

const userProfile = (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];
  const payload = (0, _jwt.decodeToken)(token);
  console.log(payload.role);
  return res.status(200).json({
    status: "success",
    data: payload
  });
};

exports.userProfile = userProfile;