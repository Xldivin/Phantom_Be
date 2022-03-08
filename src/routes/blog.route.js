import express from "express";
import { saveBlog, getAllBlog, getById, updateBlog  } from "../controllers/blog.controller";

const router = express.Router();

router.post('/', saveBlog);
router.get('/', getAllBlog);
router.get('/:id', getById);
router.put('/:id', updateBlog);

export default router;