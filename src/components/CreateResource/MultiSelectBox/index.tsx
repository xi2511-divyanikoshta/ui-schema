import {
  Box, Chip, FormControl, Input, MenuItem, Select,
} from "@mui/material";
import React from "react";
import { pick } from "dot-object";
import { LabelTypography } from "../../Typography";
import { useStyles } from "./style";

const MultiSelectBox = ({ multiSelectFields, fieldChanged, store }: any) => {
  const classes = useStyles();

  const formValue: string[] = pick(multiSelectFields.store, store) || [];
  return (
    <Box key={multiSelectFields.id}>
      <LabelTypography text={multiSelectFields.label} />
      <FormControl required={multiSelectFields?.required === true} className={classes.formControl} variant="outlined">
        <Select
          labelId="demo-simple-select-required-label"
          id={multiSelectFields.id}
          value={formValue}
          key={multiSelectFields.id}
          onChange={(ev: any) => fieldChanged(multiSelectFields.store, ev.target.value)}
          className={classes.selectEmpty}
          multiple
          name={multiSelectFields.lable}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chipbox} />
              ))}
            </div>
          )}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {multiSelectFields.options && multiSelectFields.options.map((optionItem: any) => (
            <MenuItem value={optionItem.value}>{optionItem.value}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiSelectBox;
