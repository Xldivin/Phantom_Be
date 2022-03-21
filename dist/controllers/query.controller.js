"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveQuery = exports.getById = exports.getAllQuery = exports.deleteQueryById = void 0;

var _query = _interopRequireDefault(require("../database/model/query.model"));

var _validation = require("../helpers/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveQuery = async (req, res) => {
  const {
    error
  } = (0, _validation.queriesValidation)(req.body);

  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message
    });
  }

  const query = req.body;
  const newQuery = new _query.default(query);
  await newQuery.save();
  res.status(201).json({
    status: "success",
    data: newQuery
  });
};

exports.saveQuery = saveQuery;

const getAllQuery = async (req, res) => {
  const query = await _query.default.find();
  res.status(200).json({
    status: "success",
    data: query
  });
};

exports.getAllQuery = getAllQuery;

const getById = async (req, res) => {
  const {
    id
  } = req.params;
  const query = await _query.default.findById(id);
  if (!query) return res.status(404).json({
    status: "fail",
    message: "query not found"
  });
  res.status(200).json({
    status: "success",
    data: query
  });
};

exports.getById = getById;

const deleteQueryById = async (req, res) => {
  const {
    id
  } = req.params;
  const query = await _query.default.findById(id);
  if (!query) return res.status(404).json({
    status: "fail",
    message: "Query not found"
  });
  await _query.default.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Query deleted",
    data: query
  });
};

exports.deleteQueryById = deleteQueryById;