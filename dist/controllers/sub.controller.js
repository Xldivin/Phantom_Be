"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsubscribe = exports.saveSubs = exports.getAllSubs = void 0;

var _subsModel = _interopRequireDefault(require("../database/model/subs-model"));

var _validation = require("../helpers/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveSubs = async (req, res) => {
  const sub = req.body;
  const {
    error
  } = (0, _validation.subValidation)(sub);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  const usermail = await _subsModel.default.findOne({
    email: req.body.email
  });

  if (usermail) {
    return res.status(409).json({
      status: "fail",
      message: "email have been used"
    });
  }

  const newSub = new _subsModel.default(sub);
  await newSub.save();
  res.status(201).json({
    status: "success",
    message: "succesfully subscribed",
    data: newSub
  });
};

exports.saveSubs = saveSubs;

const getAllSubs = async (req, res) => {
  const sub = await _subsModel.default.find();
  res.status(200).json({
    status: "success",
    data: sub
  });
};

exports.getAllSubs = getAllSubs;

const unsubscribe = async (req, res) => {
  const sub = await _subsModel.default.findOne(_subsModel.default.email); //console.log(sub)

  if (!sub) return res.status(404).json({
    status: success,
    message: "User not found"
  });
  await _subsModel.default.findOneAndDelete(sub);
  res.status(200).json({
    status: "success",
    message: "Subscription Removed",
    data: null
  });
};

exports.unsubscribe = unsubscribe;