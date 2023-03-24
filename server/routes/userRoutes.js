import express from "express"
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/users.js";

import {verifyToken} from "../middleware/auth.js"

const usersRoutes = express.Router();

/*  get routes */
usersRoutes.get("/:id",verifyToken,getUser)
usersRoutes.get("/:id/friends",verifyToken,getUserFriends)

/*  patch route to update the data base */
usersRoutes.patch("/:id/:friendsId",verifyToken,addRemoveFriend)

export default usersRoutes