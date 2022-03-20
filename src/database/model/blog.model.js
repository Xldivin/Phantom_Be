import mongoose from "mongoose";

const Blogchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    descrption: {
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
    comment: [
        {
            name: { type: String, required: true},
            comment: { type: String, required: true},
            createdAt: { type: Date, default: new Date()}
        }
    ],
});
const Blog = mongoose.model('Blog', Blogchema);
export default Blog;