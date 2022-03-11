import Subs from '../database/model/subs-model'
import { subValidation } from '../helpers/validation';

export const saveSubs  = async (req, res) => {
    const sub = req.body;
    const {error} = subValidation(sub);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    const newSub = new Subs(sub);
    await newSub.save();
    res.status(201).json({ success: true, message: "succesfully subscribed", data: newSub});
}
export const getAllSubs = async (req, res) => {
    const sub = await Subs.find();
    res.status(200).json({status: "success", data: sub})
}
export const unsubscribe = async (req, res) => {
    const sub = await Subs.findOne(Subs.email);
    //console.log(sub)
    if (!sub) return res.status(404).json({ success: false, message: "User not found" });
    await Subs.findOneAndDelete(sub);
    res.status(200).json({ success: true, message: "Subscription Removed", data: null });
}
