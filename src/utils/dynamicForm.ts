import { pick, str } from "dot-object";
import { merge } from "lodash";

const isInvalid = (section: any) => section === undefined || section === null || section === {};

const addIfFieldIsAbsent = (key: string, defaultValue: any, required: boolean, component: string, obj: any) => {
  const temp = pick(key, obj);
  if (!temp) {
    if (required) {
      switch (component) {
        case "input":
        case "rawInput":
        case "singleSelect":
        case "toggle":
          str(key, "", obj);
          return obj;
        case "multiSelect":
        case "multiInput":
        case "array_group":
          str(key, [], obj);
          return obj;
        case "object_group":
          str(key, {}, obj);
          return obj;
        default:
          break;
      }
    }
    str(key, defaultValue, obj);
  }
  return obj;
};

export const generateDefaultObjectFromFields = (fields: any[], existingStore: any): any => fields.reduce((prev: any, curr: any) => {
  const obj = { ...prev };
  switch (curr.component) {
    case "input":
    case "rawInput":
    case "singleSelect":
    case "multiSelect":
    case "multiInput":
    case "toggle":
    case "object_group":
    case "array_group":
      return addIfFieldIsAbsent(curr.store, curr.defaultValue, curr.required, curr.component, obj);

    case "field_group":
      return merge(obj, generateDefaultObjectFromFields(curr.fields, obj));

    default:
      throw new Error(`Invalid component "${curr.component}" provided in dynamic form UI schema`);
  }
}, existingStore);

export const generateDefaultObjectFromSection = (sections: any, existingStore: any) => {
  if (isInvalid(sections) || isInvalid(existingStore)) {
    return null;
  }
  return sections.reduce((prev: any, curr: any) => {
    const obj = { ...prev };
    switch (curr.type) {
      case "input_block":
        return merge(obj, generateDefaultObjectFromFields(curr.fields, obj));

      case "table":
        return addIfFieldIsAbsent(curr.tableData.store, curr.tableData.defaultValue, false, "", obj);

      default: {
        return prev;
      }
    }
  }, existingStore);
};
