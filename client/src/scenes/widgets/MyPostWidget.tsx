import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { PostDropzone } from "components/postDropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { HtmlHTMLAttributes, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setPosts } from "state";


interface PostWidgetProps {
  picture: any | null;
}
  interface ImageState {
    name: string;
    preview: string;
  }

export const MyPostWidget = ({ picture }: PostWidgetProps) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state: AppState) => state.user);
  const token = useSelector((state: AppState) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;



//  const handleFormSubmit = async (
//     values: any,
//     onSubmitProps: any
//   ) => {}
  // if (image){
  //   console.log(image[0])
  // }

  
 
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description",post);
    if (image) {
      formData.append("picture",image)
    }
    
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    console.log(posts);
    
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };


  ;
  
  return (
    <WidgetWrapper>
            <FlexBetween gap="1.5rem" mb="0.25rem">
              <UserImage image={picture} />

              <InputBase 
                placeholder="What are you thinking"
                onChange={(e)=>setPost(e.target.value)}
                value={post}
                name ="description"
                sx={{
                  width: "100%",
                  backgroundColor: palette.neutral.light,
                  borderRadius: "5rem",
                  padding: "1rem 2rem",
                }}
              />
            </FlexBetween>
            {isImage && (
              <Box
                border={`1px solid ${medium}`}
                borderRadius="5px"
                mt="1rem"
              >
                <PostDropzone setImage={setImage} imagee ={image} />
              </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
              <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                <ImageOutlined sx={{ color: mediumMain }} />
                <Typography
                  color={mediumMain}
                  sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                >
                  image
                </Typography>
              </FlexBetween>
              {isNonMobileScreens ? (
                <>
                  <FlexBetween gap="0.25rem">
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
                  </FlexBetween>
                  <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                  </FlexBetween>
                  <FlexBetween gap="0.25rem">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                  </FlexBetween>
                </>
              ) : (
                <FlexBetween gap="0.25rem">
                  <MoreHorizOutlined sx={{ color: mediumMain }} />
                </FlexBetween>
              )}
              <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                  color: palette.backgrounds.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                Post
              </Button>
            </FlexBetween>
    </WidgetWrapper>
  );
};
