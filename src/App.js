import './App.css';
import schemaData from "./json-schema.json";
import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SwitchCase from "./components/SwitchCase";
import defaultValues from "./DefaultValue.json";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SectionCreate from './components/SectionCreate';
import Button from '@mui/material/Button';


function App() {
  let storeData = "";

  const getDefaultValue = (store) => {
    let defVal = store.split(".");
    let value = defaultValues;
    for(let i = 0; i < defVal.length ; i++){
      if(!value){
        return "";
      }
      value = value[defVal[i]];
    }
    return value;
  }

  const getType = (jsonSchema) => {
    if(typeof(jsonSchema.type) === "string"){
      return jsonSchema.type;
    } else if(Array.isArray(jsonSchema.type)){
        for(let i = 0; i < jsonSchema.type.length ; i++){
          if(jsonSchema.type[i] !== null){
            return jsonSchema.type[i]
          }
        }
    }
  }

  const createArrayFields = (schema, store, fields, fieldName) => {
    if(getType(schema.items) === "object"){
      for (const property in schema.items.properties) {
        // if(schema.items.properties[property].type === "object" || schema.items.properties[property].type === "array"){
        if(getType(schema.items.properties[property]) === "object" || getType(schema.items.properties[property]) === "array"){
          store += "." + property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = "";
          obj.label = store;
          obj.store = store;
          obj.jsonSchemaType = "arrayString";
          obj.component = "";
          obj.type = "";
          // obj.defaultValue = defaultValues[store];
          obj.defaultValue = getDefaultValue(store);
          obj.required = (schema.items.required && schema.items.required.includes(property))  ? true : false;
          if(!fields.fields){
            fields.fields = [];
          }
          fields.fields.push(obj);

          // if(schema.items.properties[property].items &&  schema.items.properties[property].items.type !== "string" && !(schema.items.properties[property].items.additionalProperties)){
          if(schema.items.properties[property].items &&  getType(schema.items.properties[property].items) !== "string" && !(schema.items.properties[property].items.additionalProperties)){
            if(Object.keys(schema.items.properties[property].items.properties).length <= 3){
              obj.jsonSchemaType = "arrayOfObjectWithThreeFields";
              for (const keys in schema.items.properties[property].items.properties){
                // if(schema.items.properties[property].items.properties[keys].type === "array" && schema.items.properties[property].items.properties[keys].items.type === "object"){
                  if(getType(schema.items.properties[property].items.properties[keys]) === "array" && getType(schema.items.properties[property].items.properties[keys].items) === "object"){
                    obj.jsonSchemaType = "arrayOfObjectWithThreeFieldsHavingArrayOrObjectInside";
                    obj.component = "rawInput"
                }
              }
            }else if (Object.keys(schema.items.properties[property].items.properties).length > 3) {
              obj.jsonSchemaType = "nestedArrayOfObjectGreaterThenThreeFields";
              for (const keys in schema.items.properties[property].items.properties){
                // if(schema.items.properties[property].items.properties[keys].type === "array" && schema.items.properties[property].items.properties[keys].items.type === "object"){
                  if(getType(schema.items.properties[property].items.properties[keys]) === "array" && getType(schema.items.properties[property].items.properties[keys].items) === "object"){
                    obj.jsonSchemaType = "nestedArrayOfObjectGreaterThenThreeFieldsHavingNestedArrayOrObject";
                    obj.component = ""
                }
              }
            }else{
              obj.jsonSchemaType = getType(schema.items.properties[property]);
            }
            fields.fields[fields.fields.length-1] = createArrayFields(schema.items.properties[property], store, fields.fields[fields.fields.length-1], property);
          }
          obj.component = "rawInput";
        }else{
          store += "." + property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = "";
          obj.store = store;
          obj.label = store;
          obj.jsonSchemaType = getType(schema.items.properties[property]);
          obj.component = "";
          if(schema.items.properties[property].additionalProperties){
            obj.component = "rawInput";
          }
          obj.type = "";
          // obj.defaultValue = defaultValues[store];
          obj.defaultValue = getDefaultValue(store);
          obj.required = (schema.items.required && schema.items.required.includes(property))  ? true : false;
          if(!fields.fields){
            fields.fields = [];
          }
          fields.fields.push(obj);
          let strArr = store.split(".");
          store = "";
          for (let i = 0; i < (strArr.length - 1); i++) {
            store += strArr[i] + ".";
          }
          store = store.substring(0, store.length - 1);
        }
      }     
    }else{
      let obj = {};
      obj.id = store;
      obj.name = fieldName;
      obj.hint = "";
      obj.label = store;
      obj.store = store;
      obj.jsonSchemaType = "arrayString";
      obj.component = "";
      obj.type = "";
      // obj.defaultValue = defaultValues[store];
      obj.defaultValue = getDefaultValue(store);
      // obj.required = (schema.items.properties[property].required && schema.items.properties[property].required.includes(property))  ? true : false;
      if(!fields.fields){
        fields.fields = [];
      }
      fields.fields.push(obj);
      let strArr = store.split(".");
      store = "";
      for (let i = 0; i < (strArr.length - 1); i++) {
        store += strArr[i] + ".";
      }
      store = store.substring(0, store.length - 1);
    }
    return fields;
  };

  const createFields = (jsonSchema, store, fields) => {
    if (getType(jsonSchema) === "object" && !(jsonSchema.additionalProperties)) {
      for (const property in jsonSchema.properties) {
        if (getType(jsonSchema.properties[property]) === "object" && !(jsonSchema.properties[property].additionalProperties)) {
          const values = jsonSchema.properties[property];
          store += property + ".";
          fields = createFields(values, store, fields);
          store = store.substring(0, store.length - 1);
          let strArr = store.split(".");
          store = "";
          for (let i = 0; i < (strArr.length - 1); i++) {
            store += strArr[i] + ".";
          }
        // } else if( jsonSchema.properties[property].type === "array"){
        } else if(getType(jsonSchema.properties[property]) === "array"){
          let schema = jsonSchema.properties[property];
          store += property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = ""
          obj.label = store;
          obj.store = store;
          obj.jsonSchemaType = "arrayString";
          obj.component = "";
          obj.type = "";
          obj.defaultValue = getDefaultValue(store);
          obj.required = (jsonSchema.required && jsonSchema.required.includes(property))  ? true : false;
          fields.push(obj);
          // if(jsonSchema.properties[property].items && jsonSchema.properties[property].items.type !== "string" && !(jsonSchema.properties[property].items.additionalProperties)){
          if(jsonSchema.properties[property].items && getType(jsonSchema.properties[property].items) !== "string" && !(jsonSchema.properties[property].items.additionalProperties)){
            if(Object.keys(jsonSchema.properties[property].items.properties).length <= 3){
              obj.jsonSchemaType = "arrayOfObjectWithThreeFields";
              for (const keys in jsonSchema.properties[property].items.properties){
                // if(jsonSchema.properties[property].items.properties[keys].type === "array" && jsonSchema.properties[property].items.properties[keys].items.type === "object"){
                  if(getType(jsonSchema.properties[property].items.properties[keys]) === "array" && getType(jsonSchema.properties[property].items.properties[keys].items) === "object"){
                    obj.jsonSchemaType = "arrayOfObjectWithThreeFieldsHavingArrayOrObjectInside";
                    obj.component = "rawInput"
                }
              }
            } else if (Object.keys(jsonSchema.properties[property].items.properties).length > 3) {
              obj.jsonSchemaType = "arrayOfObjectGreaterThenThreeFields";
              for (const keys in jsonSchema.properties[property].items.properties){
                // if(jsonSchema.properties[property].items.properties[keys].type === "array" && jsonSchema.properties[property].items.properties[keys].items.type === "object"){
                  if(getType(jsonSchema.properties[property].items.properties[keys]) === "array" && getType(jsonSchema.properties[property].items.properties[keys].items) === "object"){
                    obj.jsonSchemaType = "arrayOfObjectGreaterThenThreeFieldsHavingNestedArrayOrObject";
                    obj.component = ""
                }
              }
            } else {
              obj.jsonSchemaType = getType(jsonSchema.properties[property]);
            }
            fields[(fields.length - 1)] = createArrayFields(schema, store, fields[fields.length - 1], property);
          }
          
          obj.component = "rawInput"
          let strArr = store.split(".");
          store = "";
          for (let i = 0; i < (strArr.length - 1); i++) {
            store += strArr[i] + ".";
          }
        }
        else {
          store += property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = "";
          obj.label = store;
          obj.store = store;
          obj.component = "";
          obj.type = "";
          obj.jsonSchemaType = getType(jsonSchema.properties[property]);
          if(jsonSchema.properties[property].additionalProperties){
            obj.component = "rawInput";
          }
          if(getType(jsonSchema.properties[property]) === "boolean"){
            obj.component = "toggle";
            obj.type = "button";
            obj.option = [
              {
                  "name": "False",
                  "value": false
              },
              {
                  "name": "True",
                  "value": true
              }
          ]
          }else if(getType(jsonSchema.properties[property]) === "number"){
            obj.component = "input";
            obj.type = "number";
          }
          obj.defaultValue = getDefaultValue(store);
          obj.required = (jsonSchema.required && jsonSchema.required.includes(property))  ? true : false;
          fields.push(obj);

          let strArr = store.split(".");
          store = "";
          for (let i = 0; i < (strArr.length - 1); i++) {
            store += strArr[i] + ".";
          }
        }
      }
    }else {
     store = store.substring(0, store.length - 1);
      let obj = {};
      obj.name = "";
      obj.hint = ""
      obj.label = store;
      obj.jsonSchemaType = "rawInput";
      obj.component = "rawInput";
      obj.type = "";
      obj.store = store;
      // obj.defaultValue = defaultValues[store];
      obj.defaultValue = getDefaultValue(store);
      fields.push(obj);
      let strArr = store.split(".");
      store = "";
      for (let i = 0; i < (strArr.length - 1); i++) {
        store += strArr[i] + ".";
      }
    }
    return fields;
  };

  let fields = createFields(schemaData, storeData, []);
  // console.log("fields-----", fields);

  const [sectionArr, setSectionArr] = useState([
    {
      sectionName: "Basic Detail",
      sectionDec: "Basic Detail",
      expand : true,
      type : "input_block",
      id : "Default",
      fields : []
    },
    {
      sectionName: "Create Table",
      sectionDec: "Create Table",
      expand : true,
      type : "table",
      id : "Default",
      tableData : {
        editable : true,
        deletable : true,
        store: "node_groups",
        visible : [],
        defaultValue : [],
        fields : [],
      },
      fields : []
    },
  ]);

  const updateStore = (fields) => {
    let newFileds = fields.map((field) => {
      if(field.fields){
        field.fields = updateStore(field.fields);
      }
        let newStore = field.store.split(".");
        field.store = newStore[newStore.length - 1];
        return field;
    })
    return newFileds;
  }

  const checkRawInput = (fieldArr) => {
    for(let i = 0; i < fieldArr.length ; i++ ){
      if(fieldArr[i].component === "rawInput"){
        delete (fieldArr[i].fields);
      }else{
        if(fieldArr[i].fields){
          fieldArr[i].fields = checkRawInput(fieldArr[i].fields);
        }
      }
    }
    return fieldArr;
  };

  const removeUsedField = (fieldList) => {
    for(let i = 0; i < fieldList.length; i++) {
        delete (fieldList[i].rank);
        delete (fieldList[i].jsonSchemaType);
        if(!fieldList[i].option || (fieldList[i].option && fieldList[i].option.length === 0)) {
            delete (fieldList[i].option);
        }
        if(fieldList[i].fields) {
          fieldList[i].fields = removeUsedField(fieldList[i].fields);
        }
    }
    return fieldList;
  }

  const submitForm = () => {
    let newSection = sectionArr.map((section) => {
      section.fields.sort((a, b) => a.rank - b.rank);
      let newFiledsArr = JSON.parse(JSON.stringify(section.fields));
        for(let i = 0; i < section.fields.length; i++){
          let fieldGroupObj = {};
          fieldGroupObj.component = "field_group";
          fieldGroupObj.header = "header";
          fieldGroupObj.id = "request";
          fieldGroupObj.fields = [];
          for(let j = i; j < section.fields.length; j++){
              if(section.fields[i].store !== section.fields[j].store && section.fields[i].rank && section.fields[j].rank && section.fields[i].rank === section.fields[j].rank){
                fieldGroupObj.fields.push(section.fields[i]);
                fieldGroupObj.fields.push(section.fields[j]);
                let index = newFiledsArr.findIndex(x => x.store === section.fields[i].store);
                delete newFiledsArr.splice(index,1);
                index = newFiledsArr.findIndex(x => x.store === section.fields[j].store);
                delete newFiledsArr.splice(index,1);
              }
          }
          if(fieldGroupObj.fields.length !== 0){
            newFiledsArr.push(fieldGroupObj)
          }
        }
        section.fields = checkRawInput(newFiledsArr);
        section.fields = removeUsedField(section.fields);

        if(section.sectionName === "Create Table"){
          let newFields = section.fields.map((field) => {
            if(field.fields){
              field.fields = updateStore(field.fields);
            }
            let newStore = field.store.split(".");
            field.store = newStore[newStore.length - 1];
            return field;
          })
          section.fields = newFields;
          section.tableData.fields = section.fields;
          delete section.fields
        }
      return section;
    });
    console.log("newSection--------", newSection);
  };

  return (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
         <SectionCreate sectionArr={sectionArr} setSectionArr={setSectionArr} />
        </Grid>
        <Grid item xs={8}>
        <form autoComplete="off">
          {fields && fields.length > 0 && fields.map((item, index) => (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{item.store}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <SwitchCase item={item} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={true} />
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="outlined" onClick={submitForm} style={{marginLeft: "1rem"}}>Add</Button>
        </form>
        </Grid>
      </Grid>
    </Box> 
  </>
  );
}

export default App;
