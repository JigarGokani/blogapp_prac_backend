const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likedPost = async(req,res)=>{
    try{
        const {post,user} = req.body;

        const like = new Like({
            post,user
        });

        const updatedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:updatedLike._id}},{new:true})
        .populate("likes");
        
        res.json({
            post:updatedPost,
        })

    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating like"
        });

    }
}

exports.unlikePost = async(req,res)=>{
    try{
        const{post,like}= req.body;

        const deletedLike = await Like.findByIdAndDelete({post:post,_id:like});

        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});


        res.json({
            post:updatedPost,
    })
    }
    catch(error){
        return res.status(500).json({
            error:"Error while deleting like"
        });

    }
}












exports.dummyLink = (req,res)=>{
    res.send("This is my dummy route")
}