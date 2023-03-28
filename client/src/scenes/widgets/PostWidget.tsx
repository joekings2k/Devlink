import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

interface PostWidgetProps {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picture: {};
  userPicture: {};
  likes: {};
  comments: [];
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
  comments,
}: PostWidgetProps) => {
  return <>hello</>;
};
