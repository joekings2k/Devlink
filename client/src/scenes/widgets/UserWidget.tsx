import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "state";

interface UserWidgetProps {
  userId?: string;
  picture?:string | null;
}
interface UserData {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  friends: any[];
}

export const UserWidget = ({
  userId = "6415d97d9b7d96cef111ab19",
  picture,
}: UserWidgetProps) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state: AppState) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data)
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return(<>comon</>);
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  }: UserData = user;
  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picture} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": { color: palette.primary.light },
                cursor: "pointer",
              }}
            >
              {firstName}
              {lastName}
            </Typography>
            <Typography color={medium}>{friends.length}</Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBetween>

        <Divider />

        {/* second row */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};
