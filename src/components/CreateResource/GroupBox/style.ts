import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  groupBox: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    marginBottom: "1rem",
  },
  FlexItem: {
    flexGrow: 1,
  },
  subHeader: {
    fontSize: "1.1rem",
    marginBottom: "5px",
  },
  rootGroupBox: {
    marginBottom: "5px",
  },
}));
