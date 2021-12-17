/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Chip, FormControl, TextField, Tooltip,
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import HelpSharpIcon from "@mui/icons-material/HelpSharp";
import React from "react";
import { pick } from "dot-object";
import { LabelTypography } from "../../Typography";
import { useStyles } from "./style";
import "./style.scss";

const MultiInputBox = ({ multiInputField, fieldChanged, store }: any) => {
  const classes = useStyles();
  const handleChange = (_event: any, newValue: string[]) => {
    fieldChanged(multiInputField.store, newValue);
  };
  const values = pick(multiInputField.store, store) || [];
  return (
    <Box key={multiInputField.id} className={classes.multiInputBox}>
      <LabelTypography text={multiInputField.label} />
      <FormControl required={multiInputField?.required === true} className={classes.formControl} variant="outlined">
        <Autocomplete
          multiple
          id="tags-outlined"
          value={values}
          onChange={handleChange}
          freeSolo
          noOptionsText
          options={values?.map((item: any) => item)}
          className="autocompleteClass"
          renderTags={(value: string[], getTagProps) => value?.map((ele: string, index: number) => (
            <Chip
              label={ele}
              {...getTagProps({ index })}
            />
          ))}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              helperText={multiInputField.hint}
            />
          )}
        />
      </FormControl>
      <Tooltip title="Press enter to add to list" placement="top"><HelpSharpIcon fontSize="small" color="primary" /></Tooltip>
    </Box>
  );
};

export default MultiInputBox;
