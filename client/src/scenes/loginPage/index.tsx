import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Form } from "./Form";

export const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      width={isNonMobileScreen ? "50%" : "90%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      sx={{ backgroundColor: theme.palette.backgrounds.alt }}
    >
      <Typography
        fontWeight="500"
        variant="h5"
        sx={{ mb: "1.5rem" }}
      >
        Welcome to Devlink a social media for developers
      </Typography>
      <Form />
    </Box>
  );
};
