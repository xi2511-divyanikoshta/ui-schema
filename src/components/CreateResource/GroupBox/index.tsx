/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import { Box } from '@mui/material';
import React from "react";
import { HeaderSixTypography } from "../../Typography";
import InputBox from "../InputBox";
import SelectBox from "../SelectBox";
import { useStyles } from "./style";

const GroupBox = ({ fieldsGroup, fieldChanged, store }: any) => {
  const classes = useStyles();
  return (
    <Box className={classes.rootGroupBox}>
      <HeaderSixTypography text={fieldsGroup.header} className={classes.subHeader} />
      <Box component="div" className={classes.groupBox}>
        {fieldsGroup.fields && fieldsGroup.fields.map((item: any) => {
          if (item.type === "text" || item.type === "number") {
            return <InputBox key={item.id} store={store} inputItem={item} fieldChanged={fieldChanged} className={classes.FlexItem} />;
          } if (item.type === "select") {
            return <SelectBox key={item.id} selectFields={item} fieldChanged={fieldChanged} store={store} />;
          }
        })}
      </Box>

    </Box>
  );
};

export default GroupBox;
