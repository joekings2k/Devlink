import { Typography, useTheme,Box, Divider } from "@mui/material";
import { Friend } from "./Friend";
import WidgetWrapper from "components/WidgetWrapper";
import {useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { AppState, setFriends } from "state";
import { useNavigate } from "react-router-dom";
import { palette } from "@mui/system";

interface FriendListWidgetProps{
  userId:string;
}

export const FriendListWidget = ({userId}:FriendListWidgetProps)=>{
  const dispatch = useDispatch()
  const {palette} = useTheme()
  const token = useSelector((state: AppState) => state.token);
  const friends = useSelector((state: AppState) => state.user.friends);

  const getFriends= async()=>{
    const response= await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method:"Get",
        headers:{Authorization :`Bearer ${token}`}
      }
    )
    const data = await response.json()
    console.log(data)
    dispatch(setFriends({friends:data}))
  }

  useEffect(()=>{
    getFriends(); // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return(
    <WidgetWrapper>
      <Typography 
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{mb:"0.5rem"}}
      >
        Friend List 
      </Typography>
      <Divider sx={{mb:"1rem"}}/>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend:any)=>(
          <Friend
            key={friend._id}
            friendId={friend._id}
            name ={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicture={friend.picture?.secure_url}
           />
        ))}
      </Box>
    </WidgetWrapper>
  )

}