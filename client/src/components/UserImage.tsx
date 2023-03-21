import { Box } from "@mui/material";
import { styled } from "@mui/system";


interface UserImageProps {
  image: any;
  size?: string;
}
const UserImage =({image,size="60px"}:UserImageProps)=>{
  return(
    <Box width ={size} height ={size} >
      <img 
        style={{objectFit:"cover",borderRadius:"50%"}}
        width={size}
        height={size}
        alt = "User"
        src={image}
      />

    </Box>
  )
}

export default UserImage