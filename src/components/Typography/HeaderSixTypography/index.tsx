import Typography from "@mui/material/Typography";
import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import { HeaderSixTypographyInterface } from "./type";
import { theme } from "./style";

export const HeaderSixTypography = ({ text, className } : HeaderSixTypographyInterface) => (
  <ThemeProvider theme={theme}>
    <Typography className={className} variant="h6">
      {text}
    </Typography>
  </ThemeProvider>

);
