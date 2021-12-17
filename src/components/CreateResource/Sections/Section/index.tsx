import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { useStyles } from "./style";
import "./style.scss";
import { SwtichCase } from "../../SwtichCase";
import TableBox from "../../TableBox";

import { CaptionTypography, HeaderSixTypography } from "../../../Typography";

export const Section = ({
  item, store, onFieldChanged,
}: any) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(item.expand);

  return (
    <Accordion key={item.id} className={classes.boxShadow} expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Box className={classes.typograhpyBox}>
          <HeaderSixTypography text={item.section} />
          <CaptionTypography text={item.sectionDec} className={classes.captionClass} />
          <hr className={classes.hrClass} />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.accordianDetail}>
        {item.type === "input_block" && <SwtichCase store={store} inputFields={item.fields} fieldChanged={onFieldChanged} />}
        {item.type === "table" && <TableBox store={store} tableData={item.tableData} fieldChanged={onFieldChanged} sectionName={item.section} />}
      </AccordionDetails>
    </Accordion>
  );
};
