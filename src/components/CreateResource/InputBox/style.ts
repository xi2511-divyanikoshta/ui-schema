import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  typograhpyBox: {
    width: "100%",
  },
  inputBox: {
    marginBottom: "10px",
  },
  textField: {
    "& input": {
      fontFamily: "RobotoMedium",
    },
  },
}));
