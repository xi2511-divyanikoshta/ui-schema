import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  text: {
    letterSpacing: 0,
    fontWeight: 600,
  },
}));

export const theme = createTheme({
  typography: {
    fontFamily: "PoppinsRegular",
  },
});

export default useStyles;
