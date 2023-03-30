import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import { Friend } from "./Friend";
import { useDispatch,useSelector } from "react-redux";
import { AppState, setPost } from "state";
import { useNavigate } from "react-router-dom";

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
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state: AppState) => state.user);
  const token = useSelector((state: AppState) => state.token);
  const friends = useSelector((state: AppState) => state.user.friends);

  const PrimaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return( <>hello</>)
};
