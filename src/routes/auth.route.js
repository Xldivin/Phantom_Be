import express from "express";
import { login_post, signup_post, userProfile,getAllUsers,deleteUser } from '../controllers/auth.controller';


const router = express.Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/user', userProfile);
router.get('/allusers', getAllUsers);
router.delete('/user/:id', deleteUser);



export default router;