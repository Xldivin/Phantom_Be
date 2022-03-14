import express from 'express';
import { deleteCommentById, getComment, getById, saveComment, } from '../controllers/comment.controller';
import { saveBlog } from '../controllers/blog.controller';

const router = express.Router();

router.post('/blog', saveComment);
router.get('/', getComment);
router.get('/:id', getById);
router.delete('/:id', deleteCommentById);

export default router;