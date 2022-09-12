import { createTheme } from "@mui/material/styles";
import { COLORS } from "../application/constants/AppConstants";

export const theme = createTheme({
    palette:{
        primary:{
            main: COLORS.primary.brown
        },
        secondary:{
            main: COLORS.primary.black
        }
    }
});