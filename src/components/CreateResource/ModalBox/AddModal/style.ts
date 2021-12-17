import { makeStyles, createStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

const theme = createTheme();
export const useStyles = makeStyles(() => createStyles({
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: " 0 auto",
    marginTop: "60px",
  },
  createButton: {
    backgroundColor: "#0099FC",
    color: "#fff",
    borderColor: "#0099FC",
    marginRight: "10px",
    fontFamily: "PoppinsMedium",
  },
  cancelButton: {
    backgroundColor: "#fff",
    color: " #3E3F52",
    borderColor: "#AEB6BE",
    marginRight: "1rem",
    fontFamily: "PoppinsMedium",
  },
}));
