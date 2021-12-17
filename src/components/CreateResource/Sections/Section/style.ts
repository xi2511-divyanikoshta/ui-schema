import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  root: {
    width: "100%",
  },
  typograhpyBox: {
    width: "100%",
  },
  accordianDetail: {
    flexDirection: "column",
  },
  boxShadow: {
    boxShadow: "none",
  },
  captionClass: {
    fontFamily: "RobotoLight",
    fontSize: " 0.7rem",
  },

  hrClass: {
    border: "1px solid #EFEFEF",
    borderBottom: "1px solid transparent",
  },
}));
