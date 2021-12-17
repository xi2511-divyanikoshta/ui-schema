import Button from '@mui/material/Button';
import clsx from "clsx";
import React from "react";
import { OutlineButtonProps } from "./type";
import useStyles from "./style";

export const OutlineButton = ({ buttonDisabled, text, className }: OutlineButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={clsx(classes.outlineButton, className)}
      disabled={buttonDisabled}
    >
      {text}
    </Button>
  );
};
