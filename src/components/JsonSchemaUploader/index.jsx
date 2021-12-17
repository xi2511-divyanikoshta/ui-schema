import React from "react";
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState, useCallback, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from "react-dropzone";
import defaultValues from "../../DefaultValue.json";

const JsonSchemaUploader = ({demoCallBack, setFields}) => {
    const history = useHistory();
    // const [ fields, setFields ] = useState();
    let fileData = {};

    let storeData = "";

    let sectionArr = [
      {
          section: "Basic Detail",
          sectionDec: "Basic Detail",
          expand : false,
          type : "input_block",
          id : "cluster-auto-scaler-config",
          fields : []
        },
        {
          section: "Create Table",
          sectionDec: "Create Table",
          expand : true,
          type : "table",
          id : "Default",
          tableData : {
            editable : true,
            deletable : true,
            store: "node_groups",
            visible : [],
            defaultValue : [
              {
                name: "worker-1",
                min_capacity: 3,
                max_capacity: 9,
                instance_type: "m5.medium",
                capacity_type: "ON_DEMAND",
                labels: {
                  type: "memory-intensive",
                },
              },
            ],
            fields : [],
          },
          fields : []
        },
    ];

    const getDefaultValue = (store) => {
      let defVal = store.split(".");
      let value = defaultValues;
      for(let i = 0; i < defVal.length ; i++){
        if(!value){
          return "";
        }
        value = value[defVal[i]];
      }
      value = value ? value : ""; 
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
            obj.defaultValue = getDefaultValue(store);
            obj.required = (schema.items.required && schema.items.required.includes(property))  ? true : false;
            if(!fields.fields){
              fields.fields = [];
            }
            fields.fields.push(obj);
  
            if(schema.items.properties[property].items &&  getType(schema.items.properties[property].items) !== "string" && !(schema.items.properties[property].items.additionalProperties)){
              if(Object.keys(schema.items.properties[property].items.properties).length <= 3){
                obj.jsonSchemaType = "arrayOfObjectWithThreeFields";
                for (const keys in schema.items.properties[property].items.properties){
                  if(getType(schema.items.properties[property].items.properties[keys]) === "array" && getType(schema.items.properties[property].items.properties[keys].items) === "object"){
                      obj.jsonSchemaType = "arrayOfObjectWithThreeFieldsHavingArrayOrObjectInside";
                      obj.component = "rawInput";
                      obj.type = "text";
                  }
                }
              }else if (Object.keys(schema.items.properties[property].items.properties).length > 3) {
                obj.jsonSchemaType = "nestedArrayOfObjectGreaterThenThreeFields";
                for (const keys in schema.items.properties[property].items.properties){
                  if(getType(schema.items.properties[property].items.properties[keys]) === "array" && getType(schema.items.properties[property].items.properties[keys].items) === "object"){
                      obj.jsonSchemaType = "nestedArrayOfObjectGreaterThenThreeFieldsHavingNestedArrayOrObject";
                      obj.component = "";
                      obj.type = "";
                  }
                }
              }else{
                obj.jsonSchemaType = getType(schema.items.properties[property]);
              }
              fields.fields[fields.fields.length-1] = createArrayFields(schema.items.properties[property], store, fields.fields[fields.fields.length-1], property);
            }
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
            obj.type = "";
            if(schema.items.properties[property].additionalProperties){
              obj.component = "rawInput";
              obj.type = "text";
            }
            
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
        obj.defaultValue = getDefaultValue(store);
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
            obj.component = "rawInput"
            obj.type = "text";
            obj.defaultValue = getDefaultValue(store);
            obj.required = (jsonSchema.required && jsonSchema.required.includes(property))  ? true : false;
            fields.push(obj);
            if(jsonSchema.properties[property].items && getType(jsonSchema.properties[property].items) !== "string" && !(jsonSchema.properties[property].items.additionalProperties)){
              if(Object.keys(jsonSchema.properties[property].items.properties).length <= 3){
                obj.jsonSchemaType = "arrayOfObjectWithThreeFields";
                for (const keys in jsonSchema.properties[property].items.properties){
                  if(getType(jsonSchema.properties[property].items.properties[keys]) === "array" && getType(jsonSchema.properties[property].items.properties[keys].items) === "object"){
                    obj.jsonSchemaType = "arrayOfObjectWithThreeFieldsHavingArrayOrObjectInside";
                  }
                }
              } else if (Object.keys(jsonSchema.properties[property].items.properties).length > 3) {
                obj.jsonSchemaType = "arrayOfObjectGreaterThenThreeFields";
                for (const keys in jsonSchema.properties[property].items.properties){
                  if(getType(jsonSchema.properties[property].items.properties[keys]) === "array" && getType(jsonSchema.properties[property].items.properties[keys].items) === "object"){
                      obj.jsonSchemaType = "arrayOfObjectGreaterThenThreeFieldsHavingNestedArrayOrObject";
                      obj.component = ""
                      obj.type = "";
                  }
                }
              } else {
                obj.jsonSchemaType = getType(jsonSchema.properties[property]);
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

    // const gotoNext = () => {
    //     history.push({pathname : "/form", state: { callFrom : "JsonSchema" , sectionArr: sectionArr, fields: fields}});
    // }

    const run = () => {
      setFields(createFields(fileData, storeData, []));
    };
    

    const onDrop = useCallback((draggedFiles) => {
        let tempFileMap = {};
        draggedFiles.forEach((file, index) => {
          const reader = new FileReader();
          reader.readAsText(file);
    
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
    
          reader.onload = () => {
          fileData = JSON.parse(reader.result);
           run();
            tempFileMap[file.path] = arrayBufferToBase64(reader.result);
            if (index === draggedFiles.length - 1) {
              setFileMap(tempFileMap);
              tempFileMap = {};
            }
          };
        });
      }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

    const [uploadedFiles, setUploadedFiles] = useState(acceptedFiles);
    const [fileMap, setFileMap] = useState({});

    function arrayBufferToBase64(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }

      const deleteFile = (e, path, index) => {
        e.stopPropagation();
        setFileMap((prevFile) => {
          const newState = { ...prevFile };
          delete newState[path];
          return newState;
        });
        setUploadedFiles((prevFiles) => prevFiles.filter((item) => prevFiles.indexOf(item) !== index));
      };  
      
    
      useEffect(() => {
        setUploadedFiles(acceptedFiles);
      }, [acceptedFiles]);
      
    const files = uploadedFiles.map((file, index) => (
        <Grid item xs={6}>
          <Paper className="{classes.paper}">
            <span className="{classes.spanClass}">
              {file.path}
            </span>
            <CloseIcon fontSize="small" onClickCapture={(e) => deleteFile(e, file.path, index)} className="{classes.closeIcon}" />
          </Paper>
        </Grid>
      ));

    return (
          <Box className="uploader">
              <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {uploadedFiles.length > 0 ? <Grid container spacing={2}>{files}</Grid>
                  : <p>Click to select Json Schema file</p>}
              </div>
          </Box>
    )
};

export default JsonSchemaUploader;