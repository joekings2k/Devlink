import express from "express"
import { upload } from "../multerUpload.js"
import { register,login} from "../controllers/auth.js"
const authRoutes = express.Router()


authRoutes.post("/register",upload.single("picture"),register)

authRoutes.post("/login", login)

export default authRoutes