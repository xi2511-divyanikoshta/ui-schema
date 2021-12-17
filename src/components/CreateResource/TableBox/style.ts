import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  table: {
    minWidth: 650,
  },
  buttonClass: {
    marginTop: "20px",
    border: "1px solid #0099FC",
    backgroundColor: "#F7F8FA",
    fontFamily: "PoppinsMedium",
    color: "#0099FC",
  },
  tableContainer: {
    width: "70%",
    boxShadow: "none",
    border: "2px solid #E6E9ED",
    backgroundColor: "#F7F8FA",
  },
}));
