import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => createStyles({
  formControl: {
    minWidth: "230px",
  },
  selectEmpty: {
    marginTop: "-9px",
  },
  chipbox: {
    margin: 2,
    border: "2px solid #9EA8B4",
    backgroundColor: "#E7F1FE",
  },
}));
