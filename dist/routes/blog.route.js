"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUpload = exports.fileFilter = exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _blog = require("../controllers/blog.controller");

var _checkAuth = require("../middleware/check-auth");

var _cloudinary = _interopRequireDefault(require("../helpers/cloudinary"));

var _multer = _interopRequireDefault(require("multer"));

var _comment = require("../controllers/comment.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.diskStorage({});

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
const uploads = (0, _multer.default)({
  storage,
  fileFilter
});

const router = _express.default.Router();

router.post('/', uploads.single("image"), _checkAuth.checkAdminAuth, _blog.saveBlog);
router.get('/', _blog.getAllBlog);
router.get('/:id', _blog.getById);
router.put('/:id', _checkAuth.checkAdminAuth, _blog.updateBlog);
router.delete('/:id', _checkAuth.checkAdminAuth, _blog.deleteBlogById);
router.put('/:id/inquiry', _blog.inquiryonBlog);
var _default = router;
exports.default = _default;