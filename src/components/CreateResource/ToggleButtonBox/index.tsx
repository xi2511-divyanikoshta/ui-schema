import { Box } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import { ToggleButtonGroup } from '@mui/material';
import React from "react";
import { pick } from "dot-object";
import { LabelTypography } from "../../Typography";
import { useStyles } from "./style";
import "./style.scss";

const ToggleButtonBox = ({ toggleField, fieldChanged, store }: any) => {
  const existingVal = pick(toggleField.store, store);
  const classes = useStyles();
  const [node, setNode] = React.useState<string | boolean | null>(existingVal);

  const handleNode = (event: React.MouseEvent<HTMLElement>, newNode: string | boolean | null) => {
    if (newNode !== null || node === null) {
      setNode(newNode);
      fieldChanged(toggleField.store, newNode);
    }
  };
  return (
    <Box className={classes.toggleBox}>
      <LabelTypography text={toggleField.label} />
      <ToggleButtonGroup
        value={node}
        exclusive
        onChange={handleNode}
        className="toggleGroup"
      >
        {toggleField.option && toggleField.option.map((item: any) => (
          <ToggleButton value={item.value} className={classes.buttonClass}>
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>

  );
};

export default ToggleButtonBox;
