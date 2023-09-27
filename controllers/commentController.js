const Comment = require("../models/commentModel")

const Post = require("../models/postModel");

exports.createComment = async (req,res)=>{
    try{
        const {post,user,body} = req.body;

        // comment ka object banana pdega save method ke liye
        const comment = new Comment({
            post,user,body
        });

        // save into the databse
        const savedComment = await comment.save();

        // find the post by ID ,add the new comment id into its comment array
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments: savedComment._id}},{new:true})
        .populate("comments") //populate the comment array with comment document
        .exec();

        res.json({
            post:updatedPost,
        })


    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating comment"
        });

    }
}