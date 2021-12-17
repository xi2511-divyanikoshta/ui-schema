import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  outlineButton: {
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    fontFamily: "RobotoMedium",
    color: "#0099FC",
    boxShadow: "none",

    border: "2px solid #0099FC",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#0099FC",
    },
  },
}));

export default useStyles;
