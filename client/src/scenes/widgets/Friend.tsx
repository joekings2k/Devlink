import {PersonAddOutlined,PersonRemoveOutlined} from "@mui/icons-material"
import {Box,IconButton,Typography,useTheme} from "@mui/material"
import { useDispatch,useSelector } from "react-redux"
import { AppState, setFriends } from "state"
import FlexBetween from "components/FlexBetween"
import UserImage from "components/UserImage"
import { useNavigate } from "react-router-dom"

interface FriendProps {
  friendId:string;
  name:string;
  subtitle:string;
  userPicture:{}
}

export const Friend=({friendId,name,subtitle,userPicture}:FriendProps)=>{
  const {palette}= useTheme()
  const dispatch=useDispatch();
  const navigate = useNavigate()
  const {_id}= useSelector((state:AppState)=>state.user)
}