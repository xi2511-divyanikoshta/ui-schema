import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { isEqual } from "lodash";
import { pick } from "dot-object";
import { ArrayGroupBoxProps } from "./type";
import { useStyles } from "./style";
import { HeaderSixTypography } from "../../Typography";
import { SwtichCase } from "../SwtichCase";
import { generateDefaultObjectFromFields } from "../../../utils";

export const ArrayGroupBox = (props: ArrayGroupBoxProps) => {
  const classes = useStyles();
  const { spec, fieldChanged, store } = props;
  const defaultState = pick(spec.store, store) || [];
  const [items, setItems] = useState(defaultState);

  useEffect(() => {
    // Return if there is no change from default
    if (isEqual(items, defaultState)) return;

    const filteredOp = items.filter((item: any) => {
      // Skip item if any one key isn't defined
      const isDefined = spec.fields.every((field: any) => item[field.store] !== undefined && item[field.store] !== null);
      return isDefined;
    }, {});

    fieldChanged(spec.store, filteredOp);
  }, [items]);

  const onFieldChange = (index: number, key: string, value: any) => {
    setItems((v: any) => {
      const newItems = v.map((item: any, i: number) => {
        if (i === index) return { ...item, [key]: value };
        return item;
      });

      return newItems;
    });
  };

  const handleAddFields = () => {
    const item = generateDefaultObjectFromFields(spec.fields, {});
    setItems((v: any[]) => [...v, item]);
  };

  const handleRemoveFields = (index: number) => {
    setItems((v: any) => v.filter((_item: any, i: number) => i !== index));
  };

  return (
    <div>
      <Box className={classes.arrayGroup}>
        <HeaderSixTypography text={spec.header} />
        <Box component="div">
          {items && items.map((item: any, index: number) => (
            <Box component="div" className={classes.groupBox}>
              <SwtichCase store={item} inputFields={spec.fields} fieldChanged={(k: string, v: any) => onFieldChange(index, k, v)} />
              <IconButton onClick={() => handleRemoveFields(index)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

      </Box>
      <Button variant="outlined" className={classes.buttonClass} onClick={() => handleAddFields()}>Add</Button>
    </div>
  );
};
