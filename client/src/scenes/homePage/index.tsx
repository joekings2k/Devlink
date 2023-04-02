import { UserWidget } from "scenes/widgets/UserWidget";
import {  useSelector } from "react-redux";
import { AppState} from "state";
import { useMediaQuery, Box } from "@mui/material";
import { MyPostWidget } from "scenes/widgets/MyPostWidget";
import { PostsWidget } from "scenes/widgets/PostsWidget";
import { AdvertWidget } from "scenes/widgets/AdvertWidget";
import { FriendListWidget } from "scenes/widgets/FriendListWidget";
export const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picture } = useSelector((state: AppState) => state.user);

  
  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picture={picture.secure_url}></UserWidget>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picture={picture.secure_url}></MyPostWidget>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens &&(<Box flexBasis="26%">
          <AdvertWidget/>
          <Box m="2rem 0"/>
          <FriendListWidget userId={_id} />
          </Box>

          )}
      </Box>
    </Box>
  );
};
