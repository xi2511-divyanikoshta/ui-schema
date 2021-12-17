import Typography from "@mui/material/Typography";
import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import clsx from "clsx";
import { CaptionTypographyInterface } from "./type";
import useStyles, { theme } from "./style";

export const CaptionTypography = ({ text, className } : CaptionTypographyInterface) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Typography className={clsx(classes.description, className)} variant="caption" gutterBottom>
        {text}
      </Typography>
    </ThemeProvider>

  );
};
