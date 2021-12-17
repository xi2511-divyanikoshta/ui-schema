import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { str } from "dot-object";
import { useStyles } from "./style";
import { SwtichCase } from "../../SwtichCase";
import { CancelButton, SubmitButton } from "../../../Buttons";

const AddModal = ({ tableData, onSubmit, defaultValues, onCancel }: any) => {
  const classes = useStyles();

  const [subStore, setSubStore] = useState(defaultValues);

  const subFieldChange = (storeKey: string, value: any) => {
    setSubStore((store: any) => {
      const newStore = { ...store };
      str(storeKey, value, newStore);
      return newStore;
    });
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(subStore);
    onCancel();
  };

  const body = (
    <Box className={classes.paper}>
      <SwtichCase inputFields={tableData.fields} fieldChanged={subFieldChange} store={subStore} />
      <Box style={{ textAlign: "right" }}>
        <CancelButton text="Cancel" buttonType="button" handleClick={onCancel} />
        <SubmitButton text="Submit" buttonType="button" handleClick={onSubmitForm} />
      </Box>
    </Box>

  );
  return (
    <Modal open onClose={onCancel} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      {body}
    </Modal>
  );
};

export default AddModal;
