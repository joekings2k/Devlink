import {useMediaQuery,Box} from "@mui/material"
import {useEffect,useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FriendListWidget } from "scenes/widgets/FriendListWidget";
import { MyPostWidget } from "scenes/widgets/MyPostWidget";
import { PostsWidget } from "scenes/widgets/PostsWidget";
import { UserWidget } from "scenes/widgets/UserWidget";
import { AppState } from "state";

interface userState {
  picture:{secure_url:string}
}

export const ProfilePage  = () => {
  const [user,setUser] = useState<userState|null>(null)
  const {userId} = useParams()
  const token = useSelector((state:AppState)=> state.token)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  
  const getUser= async()=>{
    const response = await fetch(`/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json()
    setUser(data)
  }
  console.log(user)
  useEffect(()=>{
    getUser()// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  if (!user) return null;

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picture={user.picture.secure_url}></UserWidget>
          <Box margin="2rem 0">
            <FriendListWidget userId={userId}/>
          </Box>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picture={user.picture.secure_url}></MyPostWidget>
          <PostsWidget userId={userId}  isProfile/>
        </Box>
      </Box>
    </Box>
  );
};
