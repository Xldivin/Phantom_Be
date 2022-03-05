import express from "express";
import { saveBlog, getAllBlog, getById, updateBlog  } from "../controllers/blog.controller";

const router = express.Router();

router.post('/', saveBlog);
router.get('/', getAllBlog);
router.get('/:id', getById);
router.get('/:id', updateBlog);

export default router;