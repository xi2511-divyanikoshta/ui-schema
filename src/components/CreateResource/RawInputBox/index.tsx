import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { pick } from "dot-object";
import { LabelTypography } from "../../Typography";
import { useStyles } from "./style";

const RawInputBox = ({ inputItem, fieldChanged, store }: any) => {
  const classes = useStyles();

  // We need to store the stringified version of the JSON object in state. The second and
  // third paramters are to pretty print the JSON object to make it readable
  const defaultState = JSON.stringify(pick(inputItem?.store, store), null, 2);
  const [raw, setRaw] = useState(defaultState);
  const [err, setErr] = useState(false);

  const onChange = (e: any) => {
    setRaw(e.target.value);
  };

  useEffect(() => {
    // Return if there is no change from default
    if (isEqual(raw, defaultState)) return;
    try {
      const value = JSON.parse(raw);
      fieldChanged(inputItem?.store, value);
      setErr(false);
    } catch (ex) {
      setErr(true);
    }
  }, [raw]);

  return (
    <Box className={classes.rawInputBox}>
      <LabelTypography text={inputItem?.label} />
      <TextField
        id={inputItem?.id}
        key={inputItem?.id}
        variant="outlined"
        size="small"
        name={inputItem?.label}
        value={raw}
        type="text"
        onChange={onChange}
        required={inputItem?.required === true}
        multiline
        className={classes.textField}
        error={err}
        helperText={err ? "Invalid json object entered" : undefined}
      />
    </Box>
  );
};

export default RawInputBox;
