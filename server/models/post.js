import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  picture: {
    public_id: {
      type: String,
      default: "",
    },
    secure_url: {
      type: String,
      required: true,
      default: "",
    },
  },
  userPicture: {
    public_id: {
      type: String,
      default: "",
    },
    secure_url: {
      type: String,
      required: true,
      default: "",
    },
  },
  likes:{
    type:Map,
    of:Boolean,
  },
  Comments:{
    types:Array,
    default:[]
  }
},{timestamps:true});


const Post = mongoose.model("Post", postSchema)

export default Post