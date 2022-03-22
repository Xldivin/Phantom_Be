import User from "../database/model/user.model";
import { hash, verify } from '../helpers/hash-password';
import { decodeToken, signToken } from '../helpers/jwt';
import { registerValidation } from "../helpers/validation";

export const signup_post = async (req, res) => {
    let user = req.body;
    const {error} = registerValidation(user);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    user.password = await hash(user.password);
    const usermail = await User.findOne({email: req.body.email});
    if(usermail){
        return res.status(409).json({status:"fail", message: "user already in please login"});
    }
    const newUser = await new User(user);
    newUser.save();
    res.status(201).json({status:"success", data: newUser});
};

export const login_post = async (req, res) => {
    const {password, email} = req.body;
    let user = await User.findOne({email});
    if(!user) return res.status(401).json({status: "fail", message: "not in in "});
    const isPasswordValid = await verify(user.password, password);
    if(!isPasswordValid) return res.status(401).json({status: "fail", message: "wrong password"});
    const userdata = ({
        username: user.username,
        role: user.role,
        email: user.email
    })
    const {_id, username, role} = user;
    const token = signToken(JSON.stringify({_id,username,role, email: user.email,}));
    return res.status(200).json({status: "success", message:"successfully logged in", token, data:userdata})
};
export const userProfile = (req, res) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const payload = decodeToken(token);
    console.log(payload.role);
    return res.status(200).json({status: "success", data: payload});
}