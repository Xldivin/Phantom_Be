import mongoose from "mongoose";

const Blogchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    inquiry: [
        {
            name: { type: String, required: true},
            inquiry: { type: String, required: true},
            createdAt: { type: Date, default: new Date()}
        }
    ],
});
const Blog = mongoose.model('Blog', Blogchema);
export default Blog;