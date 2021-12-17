import Typography from "@mui/material/Typography";
import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import useStyles, { theme } from "./style";
import { LabelTypographyProps } from "./type";

export const LabelTypography = ({ text } : LabelTypographyProps) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="button" className={classes.labelClass}>
        {text}
      </Typography>
    </ThemeProvider>
  );
};
