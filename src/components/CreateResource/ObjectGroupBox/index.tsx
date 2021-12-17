/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import {
  Box, Button, IconButton,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { pick } from "dot-object";
import { HeaderSixTypography } from "../../Typography";
import { useStyles } from "./style";
import { SwtichCase } from "../SwtichCase";

const ObjectGroupBox = ({ labelField, fieldChanged, store }: any) => {
  const classes = useStyles();
  const defaultState = pick(labelField.store, store);
  let defaultKvPairs: any = [];
  if (defaultState !== undefined && defaultState !== {} && defaultState !== null) {
    defaultKvPairs = Object.keys(defaultState)?.map((k: any) => ({ key: k, value: defaultState[k] }));
  }
  const [kvPairs, setKvPairs] = useState(defaultKvPairs);
  useEffect(() => {
    // Return if there is no change from default
    if (isEqual(kvPairs, defaultKvPairs)) return;

    const reduceOp = kvPairs.reduce((prev: any, cur: any) => {
      // Skip label if key or value isn't defined
      if (!cur || !cur.key || !cur.value) return prev;
      return { ...prev, [cur.key]: cur.value };
    }, {});

    fieldChanged(labelField.store, reduceOp);
  }, [kvPairs]);

  const onFieldChange = (index: number, key: string, value: any) => {
    setKvPairs((v: any) => {
      const newKvPairs = v.map((item: any, i: number) => {
        if (i === index) return { ...item, [key]: value };
        return item;
      });

      return newKvPairs;
    });
  };

  const handleAddFields = () => {
    setKvPairs((v: any[]) => [...v, {}]);
  };

  const handleRemoveFields = (index: number) => {
    const newKvPairs = [...kvPairs];
    newKvPairs.splice(index, 1);
    setKvPairs((v: any) => (
      v.filter((item: any, i: number) => {
        if (i === index) return false;
        return true;
      })
    ));
  };

  return (
    <div>
      <Box className={classes.labelGroup}>
        <HeaderSixTypography text={labelField.header} />
        <Box component="div">
          {kvPairs && kvPairs.map((item: any, index: number) => (
            <Box component="div" className={classes.groupBox}>
              <SwtichCase inputFields={[labelField.fields.key, labelField.fields.value]} fieldChanged={(k: string, v: any) => onFieldChange(index, k, v)} store={item} />
              <IconButton onClick={() => handleRemoveFields(index)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          ))}
        </Box>

      </Box>
      <Button variant="outlined" className={classes.buttonClass} onClick={() => handleAddFields()}>Add</Button>
    </div>
  );
};

export default ObjectGroupBox;
