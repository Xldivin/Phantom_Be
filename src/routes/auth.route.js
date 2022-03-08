import express from "express";
import { login_post, signup_post } from '../controllers/auth.controller';


const router = express.Router();

router.post('/signup', signup_post);
router.post('/login', login_post);


export default router;