import express from "express";
import { saveBlog, getAllBlog, getById, updateBlog, deleteBlogById,commentonBlog,getAllComment,deleteComment  } from "../controllers/blog.controller";
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";
import cloudinary from "../helpers/cloudinary";
import multer from "multer";

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
router.put('/:id/comment',checkAuth, commentonBlog);
router.get('/:id/comments',checkAuth, getAllComment);
router.delete('/:id/comments/:commentId', deleteComment);

export default router;