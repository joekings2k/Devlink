import express, { Router } from "express";
import { upload } from "../multerUpload.js";
import { verifyToken} from "../middleware/auth.js"
import { CreatePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const postRoutes = express.Router()

/* READ */

postRoutes.get("/",verifyToken,getFeedPosts) //this route is for all the posts
postRoutes.get("/:userId/posts",verifyToken,getUserPosts) //this route is for a specific users posts

/* WRITE */ 
postRoutes.post("/",upload.single("picture"),CreatePost)

/* UPDATE */ 
postRoutes.patch("/:id/like",verifyToken,likePost)
// postRoutes.patch("/:id/comment")//functionality to add comment

export default postRoutes

