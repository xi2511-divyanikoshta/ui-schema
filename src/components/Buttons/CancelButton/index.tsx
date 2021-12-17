import Button from '@mui/material/Button';
import React from "react";
import useStyles from "./style";

export const CancelButton = ({ text, handleClick, buttonType, disabledButton }: any) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.cancelButton}
      onClick={handleClick}
      variant="outlined"
      type={buttonType}
      disabled={disabledButton}
    >
      {text}
    </Button>
  );
};
