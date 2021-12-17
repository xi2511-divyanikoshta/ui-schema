import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  typograhpyBox: {
    width: "100%",
  },
  rawInputBox: {
    marginBottom: "10px",
  },
  textField: {
    "& input": {
      fontFamily: "RobotoMedium",
    },
  },
}));
