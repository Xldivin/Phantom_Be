import express from "express";
import { saveBlog, getAllBlog, getById, updateBlog, deleteBlogById  } from "../controllers/blog.controller";
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";

const router = express.Router();

router.post('/',checkAuth, saveBlog);
router.get('/',checkAdminAuth, getAllBlog);
router.get('/:id', getById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlogById);

export default router;