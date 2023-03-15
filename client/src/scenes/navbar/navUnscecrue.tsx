import FlexBetween from "components/FlexBetween";
import { Typography, useTheme,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setMode} from "state";
import {DarkMode,LightMode} from "@mui/icons-material"
import { useDispatch} from "react-redux";

export const NavUnsecure = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  return (
    <FlexBetween
      sx={{ background: neutralLight, justifyContent: "center" }}
      pt="0.7rem"
    >
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem,2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        Devlink
      </Typography>
      <FlexBetween sx={{marginLeft:"100px"}}>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "22px" }} />
          ) : (
            <LightMode sx={{ fontSize: "22px", color: dark }} />
          )}
        </IconButton>
      </FlexBetween>
    </FlexBetween>
  );
};
