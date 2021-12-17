/* eslint-disable array-callback-return */
import {
  Box, MenuItem, Select,
} from "@mui/material";
import React from "react";
import { pick } from "dot-object";
import { FormControl } from '@mui/material';
import { useStyles } from "./style";
import { LabelTypography } from "../../Typography";

const SelectBox = ({ selectFields, fieldChanged, store }: any) => {
  const classes = useStyles();

  return (
    <Box className={classes.boxClass}>
      <LabelTypography text={selectFields.label} />
      <FormControl required={selectFields?.required === true} className={classes.formControl} variant="outlined">
        <Select
          id={selectFields.id}
          value={pick(selectFields.store, store)}
          onChange={(ev) => fieldChanged(selectFields.store, ev.target.value)}
          className={classes.selectEmpty}
          name={selectFields.label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {selectFields.options && selectFields.options.map((optionItem: any) => (
            <MenuItem value={optionItem.value} key={optionItem.value}>{optionItem.value}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBox;
