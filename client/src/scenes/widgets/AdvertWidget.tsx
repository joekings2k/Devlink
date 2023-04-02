import {Typography,useTheme} from "@mui/material"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"

export const AdvertWidget =()=>{
  const {palette} =useTheme()
  const dark = palette.neutral.dark
  const main =palette.neutral.main
  const medium = palette.neutral.medium

  return(
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500" >
          Sponsored
        </Typography>
        <Typography color={medium}> Create Ads</Typography>
      </FlexBetween>
      <img 
        width="100%"
        height ="auto"
        alt="advert"
        src="../assets/nathanKicks.jpg"
      />
      <FlexBetween>
        <Typography color={main} > Nathan Kicks </Typography>
        <Typography color={medium} > nathanKicks.dev.ng</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Hope on for a ride the most amazing shoes on the planet. Tailor made to fufill your every desire
      </Typography>
    </WidgetWrapper>
  )
}