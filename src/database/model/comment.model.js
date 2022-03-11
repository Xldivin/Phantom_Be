import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});
const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;