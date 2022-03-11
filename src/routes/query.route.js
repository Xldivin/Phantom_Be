import express from 'express';
import { deleteQueryById, getAllQuery, getById, saveQuery, } from '../controllers/query.controller';
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";

const router = express.Router();

router.post('/',checkAuth, saveQuery);
router.get('/',checkAuth, getAllQuery);
router.get('/:id',checkAuth, getById);
router.delete('/:id',checkAdminAuth, deleteQueryById);

export default router;