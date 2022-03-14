import Blog from "../database/model/blog.model";
import { blogValidation } from "../helpers/validation";
import { fileUpload } from "../helpers/multer";

export const saveBlog  = async (req, res) => {
    const {error} = blogValidation(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    if (req.file) {
        req.body.image = await fileUpload(req);
    } else {
        req.body.image =
            "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
    }
    const blog = {
        title: req.body.title,
        message: req.body.message,
        image: req.body.image};
    const newBlog = new Blog(blog);
    await newBlog.save();
    res.status(201).json({status: "success", data: newBlog});
};
export const getAllBlog = async (req, res) => {
    const blog = await Blog.find();
    res.status(200).json({status: "success", data: blog})
}
export const getById = async (req, res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog) return res.status(404).json({status: "fail", message: "blog not found"}) ;
    res.status(200).json({status: "success", data: blog});
}
export const updateBlog = async(req, res) => {
    const {id} = req.params;
    const updates = req.body;
    const blog = await Blog.findById(id);
    if(!blog) return res.status(404).json({status: "fail", message: "blog not found"}) ;
    await Blog.findByIdAndUpdate(id, updates);
    res.status(200).json({status: "success", message: "Blog updated successfully"})
}
export const deleteBlogById = async(req, res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog) return res.status(404).json({status: "fail", message: "Blog not found"});
    await Blog.findByIdAndDelete(id);
    res.status(200).json({status: "success", message:"Blog deleted", data: blog});
}