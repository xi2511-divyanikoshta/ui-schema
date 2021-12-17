import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  groupBox: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    marginBottom: "1rem",
  },
  buttonClass: {
    marginTop: "20px",
    border: "1px solid #0099FC",
    backgroundColor: "#F7F8FA",
    fontFamily: "PoppinsMedium",
    color: "#0099FC",
  },
  arrayGroup: {
    marginTop: "20px",
  },
}));
