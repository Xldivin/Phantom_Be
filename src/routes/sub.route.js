import express from "express";
import { saveSubs, unsubscribe, getAllSubs} from "../controllers/sub.controller";

const router = express.Router();

router.post('/', saveSubs);
router.get('/', getAllSubs);
router.delete('/', unsubscribe);

export default router;