import express from "express";
import { saveSubs, unsubscribe, getAllSubs} from "../controllers/sub.controller";
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";

const router = express.Router();

router.post('/', saveSubs);
router.get('/',checkAdminAuth, getAllSubs);
router.delete('/',checkAdminAuth, unsubscribe);

export default router;