import User from "../database/model/user.model";
import { hash, verify } from '../helpers/hash-password';
import { decodeToken, signToken } from '../helpers/jwt';

export const signup_post = async (req, res) => {
    let user = req.body;
    user.password = await hash(user.password);
    const newUser = await new User(user);
    newUser.save();
    res.status(201).json({success: true, message:'User created', data: newUser});
};

export const login_post = async (req, res) => {
    console.log(req.body);
    
};