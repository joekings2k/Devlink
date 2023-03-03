import express from "express";

import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {dbConnect} from "./dbConnect.js"

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/userRoutes.js";

const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname =path.dirname(__filename)
dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/assets",express.static(path.join(__dirname,'./public/assets')))
dbConnect()


app.use("/auth",authRoutes)
app.use("/users",usersRoutes)


app.listen(port ,()=>{
  console.log(`app has started on port ${port}`);
})