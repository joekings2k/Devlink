import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import {createReadStream} from "streamifier"
import dotenv from "dotenv";
dotenv.config();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,
});

const userFileUpload = (req)=>{
  try{
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          folder: "users",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      return createReadStream(req.file.buffer).pipe(stream);
    });
  }catch(err){
    return err
  }
    
}
const postFileUpload = (req)=>{
  try{
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          folder: "posts",
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      return createReadStream(req.file.buffer).pipe(stream);
    });
  }catch(err){
    return err
  }
    
}

export {userFileUpload,postFileUpload}