import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxSizing: "border-box",
    height: "3rem",
    border: "1px solid #AAB7CA",
    backgroundColor: " #0099FC",
    fontFamily: "RobotoMedium",
    color: "#ffff",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#0099FC",
      border: "1px solid #0099FC",
    },
  },
}));

export default useStyles;
