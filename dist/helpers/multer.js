"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUpload = exports.fileFilter = void 0;

var _cloudinary = _interopRequireDefault(require("./cloudinary.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

exports.fileFilter = fileFilter;

const fileUpload = async req => {
  let imageUrl = "";
  await _cloudinary.default.v2.uploader.upload(req.file.path, async function (err, image) {
    if (err) {
      console.log(err);
    }

    imageUrl = image.url;
  });
  return imageUrl;
};

exports.fileUpload = fileUpload;