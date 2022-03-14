import express from 'express';
import { deleteQueryById, getAllQuery, getById, saveQuery, } from '../controllers/query.controller';
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";

const router = express.Router();

router.post('/', saveQuery);
router.get('/',checkAdminAuth, getAllQuery);
router.get('/:id',checkAdminAuth, getById);
router.delete('/:id',checkAdminAuth, deleteQueryById);

export default router;