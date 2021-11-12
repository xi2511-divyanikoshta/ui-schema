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

  const createArrayFields = (schema, store, fields, fieldName) => {
    if(schema.items.type === "object"){
      for (const property in schema.items.properties) {
        if(schema.items.properties[property].type === "object" || schema.items.properties[property].type === "array"){
          store += "." + property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = "hint"
          obj.label = ""
          obj.store = store;
          // obj.jsonSchemaType = schema.items.properties[property].type;
          obj.jsonSchemaType = "arrayString";
          obj.component = "";
          obj.type = "";
          obj.defaultValue = defaultValues[store];
          // obj.required = (schema.items.properties[property].type.required && schema.items.properties[property].type.required.includes(property))  ? schema.items.properties[property].type.required.includes(property) : false;
          if(!fields.fields){
            fields.fields = [];
          }
          fields.fields.push(obj);

          if(schema.items.properties[property].items.type !== "string"){
            if(Object.keys(schema.items.properties[property].items.properties).length <= 3){
              obj.jsonSchemaType = "arrayOfObjectWithThreeElement";
              for (const keys in schema.items.properties[property].items.properties){
                if(schema.items.properties[property].items.properties[keys].type === "array" && schema.items.properties[property].items.properties[keys].items.type === "object"){
                    obj.jsonSchemaType = "rawInput";
                    obj.component = "rawInput"
                }
              }
            }else{
              obj.jsonSchemaType = schema.properties[property].type;
            }
            fields.fields[fields.fields.length-1] = createArrayFields(schema.items.properties[property], store, fields.fields[fields.fields.length-1], property);
          }
          
        }else{
          store += "." + property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = "hint"
          obj.label = ""
          obj.store = store;
          obj.jsonSchemaType = schema.items.properties[property].type;
          obj.component = "";
          obj.type = "";
          obj.defaultValue = defaultValues[store];
          // obj.required = (schema.items.properties[property].required && schema.items.properties[property].required.includes(property))  ? schema.items.properties[property].required.includes(property) : false;
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
      obj.hint = "hint"
      obj.label = ""
      obj.store = store;
      // obj.jsonSchemaType = schema.items.properties[fieldName].type;
      obj.jsonSchemaType = "arrayString";
      obj.component = "";
      obj.type = "";
      obj.defaultValue = defaultValues[store];
      // obj.required = (schema.items.properties[property].required && schema.items.properties[property].required.includes(property))  ? schema.items.properties[property].required.includes(property) : false;
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
    if (jsonSchema.type === "object" && !(jsonSchema.additionalProperties)) {
      for (const property in jsonSchema.properties) {
        if (jsonSchema.properties[property].type === "object" && !(jsonSchema.properties[property].additionalProperties)) {
          const values = jsonSchema.properties[property];
          store += property + ".";
          fields = createFields(values, store, fields);
          store = store.substring(0, store.length - 1);
          let strArr = store.split(".");
          store = "";
          for (let i = 0; i < (strArr.length - 1); i++) {
            store += strArr[i] + ".";
          }
        } else if( jsonSchema.properties[property].type === "array"){
          let schema = jsonSchema.properties[property];
          store += property;
          let obj = {};
          obj.id = store;
          obj.name = property;
          obj.hint = "hint"
          obj.label = ""
          obj.store = store;
          obj.jsonSchemaType = "arrayString";
          obj.component = "";
          obj.type = "";
          obj.defaultValue = defaultValues[store];
          obj.required = (jsonSchema.required && jsonSchema.required.includes(property))  ? jsonSchema.required.includes(property) : false;
          fields.push(obj);
          if(jsonSchema.properties[property].items.type !== "string"){
            if(Object.keys(jsonSchema.properties[property].items.properties).length <= 3){
              obj.jsonSchemaType = "arrayOfObjectWithThreeElement";
              for (const keys in jsonSchema.properties[property].items.properties){
                if(jsonSchema.properties[property].items.properties[keys].type === "array" && jsonSchema.properties[property].items.properties[keys].items.type === "object"){
                    obj.jsonSchemaType = "rawInput";
                    obj.component = "rawInput"
                }
              }
            }else{
              obj.jsonSchemaType = jsonSchema.properties[property].type;
            }
            fields[(fields.length - 1)] = createArrayFields(schema, store, fields[fields.length - 1], property);
          }
          
          
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
          obj.hint = "hint"
          obj.label = ""
          obj.store = store;
          obj.jsonSchemaType = jsonSchema.properties[property].type;
          obj.component = "";
          if(jsonSchema.properties[property].type === "boolean"){
            obj.component = "toggle";
          }else if(jsonSchema.properties[property].type === "number"){
            obj.component = "input";
          }
          obj.type = "";
          obj.defaultValue = defaultValues[store];
          obj.required = (jsonSchema.required && jsonSchema.required.includes(property))  ? jsonSchema.required.includes(property) : false;
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
      obj.hint = "hint"
      obj.label = ""
      obj.jsonSchemaType = "rawInput";
      obj.component = "rawInput";
      obj.type = "";
      obj.store = store;
      obj.defaultValue = defaultValues[store];
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
  console.log("fields-----", fields);

  const [sectionArr, setSectionArr] = useState([
    {
      sectionName: "Basic Detail",
      sectionDecs: "Basic Detail",
      expand : true,
      type : "",
      id : "Default",
      fields : []
    },
  ]);

  console.log("sectionArr---", sectionArr);

  const submitForm = () => {
    console.log("sectionArr---", sectionArr);
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
