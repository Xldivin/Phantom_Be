import express from "express";
import { login_post, signup_post, userProfile } from '../controllers/auth.controller';


const router = express.Router();

router.post('/signup', signup_post);
router.get('/login', login_post);
router.get('/user', userProfile);



export default router;