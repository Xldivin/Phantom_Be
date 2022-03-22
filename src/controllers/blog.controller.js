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
            "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    }
    const blog = {
        title: req.body.title,
        descrption: req.body.descrption,
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
export const commentonBlog = async(req, res) => {
    const id = (req.params.id)
    //console.log(id);
    const comment = req.body;
    //console.log(inquiry)
    const blog = await Blog.findById(id);
    if(!blog) return res.status(404).json({status: "fail", message: "blog not found"});
    blog.comment.push(comment);
    await Blog.findByIdAndUpdate(id, {comment});
    blog.save();
    res.status(201).json({status: "success", message: "comment added"});
}
export const getAllComment = async (req, res) => {
    const id = (req.params.id)
    const blog = await Blog.findById(id);
    const comments = blog.comment;
    res.status(200).json({status: "success", data: comments})
}
export const deleteComment = async (req, res) => {
    const id = (req.params.id)
    const commentId = req.params.commentId
    const blog = await Blog.findById(id);
    console.log(blog);
    const comments = blog.comment.filter(c => c.id !== commentId);
    blog.comment = comments
    blog.save()
    res.status(200).json({status: "success", data: blog});
}


