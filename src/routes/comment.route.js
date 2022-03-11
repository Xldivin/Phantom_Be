import express from 'express';
import { deleteCommentById, getComment, getById, saveComment, } from '../controllers/comment.controller';

const router = express.Router();

router.post('/', saveComment);
router.get('/', getComment);
router.get('/:id', getById);
router.delete('/:id', deleteCommentById);

export default router;