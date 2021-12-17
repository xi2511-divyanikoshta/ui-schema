import Typography from "@mui/material/Typography";
import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import clsx from "clsx";
import { SubtitleTwoTypographyInterface } from "./type";
import useStyles, { theme } from "./style";

export const SubtitleTwoTypography = ({ text, className } : SubtitleTwoTypographyInterface) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Typography className={clsx(classes.text, className)} variant="subtitle2">
        {text}
      </Typography>
    </ThemeProvider>
  );
};
