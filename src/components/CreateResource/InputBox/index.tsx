import { Box, TextField } from "@mui/material";
import React from "react";
import { pick } from "dot-object";
import { LabelTypography } from "../../Typography";
import { useStyles } from "./style";

const InputBox = ({ inputItem, fieldChanged, store }: any) => {
  const classes = useStyles();
  const onChange = (e: any) => {
    let value = null;
    if (e.target.value !== "null") {
      value = inputItem.type === "number" ? Number(e.target.value) : e.target.value;
    }
    fieldChanged(inputItem.store, value);
  };

  const getValueFromStore = () => {
    const existingValue = pick(inputItem.store, store);
    const val = (inputItem.defaultValue === null && existingValue === null) ? "null" : existingValue;
    return val;
  };

  return (
    <Box className={classes.inputBox}>
      <LabelTypography text={inputItem.label} />
      <TextField
        id={inputItem.id}
        key={inputItem.id}
        variant="outlined"
        size="small"
        name={inputItem.label}
        value={getValueFromStore()}
        type={inputItem.type}
        onChange={onChange}
        required={inputItem?.required === true}
        className={classes.textField}
      />
    </Box>
  );
};

export default InputBox;
