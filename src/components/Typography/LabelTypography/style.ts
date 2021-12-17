import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  labelClass: {
    fontFamily: "PoppinsRegular",
    letterSpacing: 0,
    color: "#636478",
    marginBottom: "1px",
    display: "block",
  },
}));

export const theme = createTheme({
  typography: {
    fontFamily: "PoppinsRegular",
  },
});

export default useStyles;
