import mongoose from "mongoose";
import "dotenv/config"


export const dbConnect = async()=>{
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.MONGO_URL);
      console.log("connected");
    } catch (err) {
      console.log(err.message);
    }
}

