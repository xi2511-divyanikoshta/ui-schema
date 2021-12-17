/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import InputBox from "../InputBox";
import RawInputBox from "../RawInputBox";
import GroupBox from "../GroupBox";
import SelectBox from "../SelectBox";
import MultiSelectBox from "../MultiSelectBox";
import ObjectGroupBox from "../ObjectGroupBox";
import ToggleButtonBox from "../ToggleButtonBox";
import MultiInputBox from "../MultiInputBox";
import { ArrayGroupBox } from "../ArrayGroupBox";

export const SwtichCase = ({
  inputFields, fieldChanged, store,
}: any) => (
  <>
    {
      inputFields && inputFields.map((_inputItem: any) => {
        switch (_inputItem.component) {
          case "input":
            return (
              <InputBox key={_inputItem.id} inputItem={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "rawInput":
            return (
              <RawInputBox key={_inputItem.id} inputItem={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "field_group":
            return (
              <GroupBox key={_inputItem.id} fieldsGroup={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "singleSelect":
            return (
              <SelectBox key={_inputItem.id} selectFields={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "multiSelect":
            return (
              <MultiSelectBox key={_inputItem.id} multiSelectFields={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "multiInput":
            return (
              <MultiInputBox key={_inputItem.id} multiInputField={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "object_group":
            return (
              <ObjectGroupBox key={_inputItem.id} labelField={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "array_group":
            return (
              <ArrayGroupBox key={_inputItem.id} spec={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          case "toggle":
            return (
              <ToggleButtonBox key={_inputItem.id} toggleField={_inputItem} fieldChanged={fieldChanged} store={store} />
            );
          default:
            return null;
        }
      })
    }
  </>
);
