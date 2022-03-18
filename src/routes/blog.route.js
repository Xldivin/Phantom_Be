import express from "express";
import { saveBlog, getAllBlog, getById, updateBlog, deleteBlogById,inquiryonBlog  } from "../controllers/blog.controller";
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";
import cloudinary from "../helpers/cloudinary";
import multer from "multer";
import { saveComment } from "../controllers/comment.controller";

const storage = multer.diskStorage({});

export const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("invalid image file!", false);
	}
};
export const fileUpload = async (req) => {
	let imageUrl = "";
	await cloudinary.v2.uploader.upload(
		req.file.path,
		async function (err, image) {
			if (err) {
				console.log(err);
			}
			imageUrl = image.url;
		}
	);
	return imageUrl;
};
const uploads = multer({ storage, fileFilter });

const router = express.Router();

router.post('/', uploads.single("image"),checkAdminAuth, saveBlog);
router.get('/', getAllBlog);
router.get('/:id', getById);
router.put('/:id',checkAdminAuth, updateBlog);
router.delete('/:id',checkAdminAuth, deleteBlogById);
router.put('/:id/inquiry',inquiryonBlog);

export default router;