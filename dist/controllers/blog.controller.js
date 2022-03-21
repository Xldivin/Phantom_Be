"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.saveBlog = exports.inquiryonBlog = exports.getById = exports.getAllBlog = exports.deleteBlogById = void 0;

var _blog = _interopRequireDefault(require("../database/model/blog.model"));

var _validation = require("../helpers/validation");

var _multer = require("../helpers/multer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveBlog = async (req, res) => {
  const {
    error
  } = (0, _validation.blogValidation)(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  if (req.file) {
    req.body.image = await (0, _multer.fileUpload)(req);
  } else {
    req.body.image = "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  }

  const blog = {
    title: req.body.title,
    message: req.body.message,
    image: req.body.image
  };
  const newBlog = new _blog.default(blog);
  await newBlog.save();
  res.status(201).json({
    status: "success",
    data: newBlog
  });
};

exports.saveBlog = saveBlog;

const getAllBlog = async (req, res) => {
  const blog = await _blog.default.find();
  res.status(200).json({
    status: "success",
    data: blog
  });
};

exports.getAllBlog = getAllBlog;

const getById = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "blog not found"
  });
  res.status(200).json({
    status: "success",
    data: blog
  });
};

exports.getById = getById;

const updateBlog = async (req, res) => {
  const {
    id
  } = req.params;
  const updates = req.body;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "blog not found"
  });
  await _blog.default.findByIdAndUpdate(id, updates);
  res.status(200).json({
    status: "success",
    message: "Blog updated successfully"
  });
};

exports.updateBlog = updateBlog;

const deleteBlogById = async (req, res) => {
  const {
    id
  } = req.params;
  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "Blog not found"
  });
  await _blog.default.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Blog deleted",
    data: blog
  });
};

exports.deleteBlogById = deleteBlogById;

const inquiryonBlog = async (req, res) => {
  const id = req.params.id; //console.log(id);

  const inquiry = req.body; //console.log(inquiry)

  const blog = await _blog.default.findById(id);
  if (!blog) return res.status(404).json({
    status: "fail",
    message: "blog not found"
  });
  blog.inquiry.push(inquiry);
  await _blog.default.findByIdAndUpdate(id, {
    inquiry
  });
  blog.save();
  res.status(201).json({
    status: "success",
    message: "inqiury added"
  });
};

exports.inquiryonBlog = inquiryonBlog;