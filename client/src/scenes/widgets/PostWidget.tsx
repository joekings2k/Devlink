import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import { Friend } from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { AppState, setPost } from "state";


interface PostWidgetProps {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picture: string;
  userPicture: {};
  likes: { [userId: string]: boolean };
  Comments: string[];
}

export const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picture,
  userPicture,
  likes,
  Comments,
}: PostWidgetProps) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const token = useSelector((state: AppState) => state.token);
  const loggedInUserId = useSelector((state: AppState) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likedCount = Object.keys(likes)?.length;
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment]= useState("")

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    console.log(updatedPost)
    dispatch(setPost({ post: updatedPost }));
  };
  const writeComment = async()=>{
    const response = await fetch(`/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({"comment":comment})
    });
    const updatedPost= await response.json()
    dispatch(setPost({ post: updatedPost }));
   
    
  }

  return (
    <WidgetWrapper sx={{ mt: "2rem" }}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicture={userPicture}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picture && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picture}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* //for like section  */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likedCount}</Typography>
          </FlexBetween>

          {/*  for comment section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{Comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween>
            <InputBase
              placeholder="Comment..."
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "5rem",
                padding: "1rem 2rem",
                mb: "0.25rem",
              }}
            />
            <Button
              onClick={writeComment}
              sx={{
                color: palette.backgrounds.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              Post
            </Button>
          </FlexBetween>
          {Comments?.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};
