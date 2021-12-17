import Button from '@mui/material/Button';
import React from "react";
import useStyles from "./style";
import { ButtonInterface } from "./type";

export const RegularButton = ({ buttonDisabled, text }: ButtonInterface) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={classes.submit}
      disabled={buttonDisabled}
    >
      {text}
    </Button>
  );
};
