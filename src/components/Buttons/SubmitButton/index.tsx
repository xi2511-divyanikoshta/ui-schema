import Button from '@mui/material/Button';
import React from "react";
import useStyles from "./style";

export const SubmitButton = ({
  text, handleClick, buttonType, disabledButton, style,
}: any) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.submitButton}
      onClick={handleClick}
      variant="outlined"
      type={buttonType}
      disabled={disabledButton}
      style={style}
    >
      {text}
    </Button>
  );
};
