import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  description: {
    letterSpacing: 0,
    color: "#AEB6BE",
  },
}));

export const theme = createTheme({
  typography: {
    fontFamily: "PoppinsRegular",
  },
});

export default useStyles;
