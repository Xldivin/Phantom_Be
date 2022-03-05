import express from 'express';
import { deleteQueryById, getAllQuery, getById, saveQuery, updateQuery } from '../controllers/query.controller';

const router = express.Router();

router.post('/', saveQuery);
router.get('/', getAllQuery);
router.get('/:id', getById);
router.put('/:id', updateQuery);
router.delete('/:id', deleteQueryById);

export default router;