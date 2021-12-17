/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { delete as del, str } from "dot-object";
import React, { useEffect, useState } from "react";
import { Section } from "./Section";
import { useStyles } from "./style";
import { generateDefaultObjectFromSection } from "../../../utils";

const Sections = ({
  formData, onChange, onFieldChange, defaultValues,
}: any) => {
  const classes = useStyles();
  const [store, setStore] = useState<any>(generateDefaultObjectFromSection(formData, defaultValues));

  useEffect(() => {
    onChange(store);
  }, [store]);

  const onFieldChanged = (storeID: any, value: any) => {
    setStore((s: any) => {
      const newStore = JSON.parse(JSON.stringify(s));
      del(storeID, newStore);
      str(storeID, value, newStore);
      return newStore;
    });

    // Call onFieldChange if it has been provided
    if (onFieldChange) onFieldChange(storeID, value);
  };

  const sectionItem = formData.map((item: any) => (
    <Section item={item} onFieldChanged={onFieldChanged} store={store} />
  ));

  return (
    <div className={classes.root}>
      {formData && sectionItem}
    </div>
  );
};

export default Sections;
