import express from "express";
import { login_post, signup_post, userProfile,getAllUsers,deleteUser } from '../controllers/auth.controller';
import { checkAuth, checkAdminAuth } from "../middleware/check-auth";


const router = express.Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/user', userProfile);
router.get('/allusers',checkAdminAuth, getAllUsers);
router.delete('/user/:id',checkAdminAuth, deleteUser);



export default router;