import Comment from '../database/model/comment.model';
import { commentValidation } from '../helpers/validation';


export const saveComment  = async (req, res) => {
    const comment = req.body;
    const {error} = commentValidation(comment);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    const newComment = new Comment(comment);
    await newComment.save();
    res.status(201).json({status: "success", data: newComment});
}

export const getComment = async (req, res) => {
    const comment = await Comment.find();
    res.status(200).json({status: "success", data: comment})
}

export const getById = async (req, res) => {
    const {id} = req.params;
    const comment = await Comment.findById(id);
    if(!comment) return res.status(404).send;
    res.status(200).json({status: "success", data: comment});
}

export const deleteCommentById = async(req, res) => {
    const {id} = req.params;
    const comment = await Comment.findById(id);
    if(!comment) return res.status(404).json({status: "fail", message: "comment not found"});
    await Comment.findByIdAndDelete(id);
    res.status(200).json({status: "success", message: "comment deleted"});
}
