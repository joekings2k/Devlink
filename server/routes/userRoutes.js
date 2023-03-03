import express from "express"
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/users.js";

import {verifyToken} from "../middleware/auth.js"

const usersRoutes = express.Router();


usersRoutes.get("/id:",verifyToken,getUser)
usersRoutes.get("/id:/friends",verifyToken,getUserFriends)


usersRoutes.patch("/:id/:friendsId",verifyToken,addRemoveFriend)

export default usersRoutes