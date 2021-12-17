/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FieldSwitchCase from "../FieldSwitchCase";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SectionCreate from '../SectionCreate';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
// import schemaData from "../../json-schema.json";
import '../../App.css';
import { useHistory } from "react-router-dom";


const Form = () => {
   const location = useLocation();
   const history = useHistory();
  
  const [formData, setFormData] = useState();
  


  const [sectionArr, setSectionArr] = useState(location.state.sectionArr);
  const [ fields , setFields ] = useState(location.state.fields);
  
  // console.log("fields-----", fields);

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
        delete (fieldList[i].required);
        if(!fieldList[i].option || (fieldList[i].option && fieldList[i].option.length === 0)) {
            delete (fieldList[i].option);
        }
        if(fieldList[i].fields) {
          fieldList[i].fields = removeUsedField(fieldList[i].fields);
        }
    }
    return fieldList;
  }

  let newSectionArr;
  useEffect(() => {
    newSectionArr = JSON.parse(JSON.stringify(sectionArr));
    setFormData(newSectionArr);
  }, [sectionArr]);

  const submitForm = async () => {
    let newSection = formData.map((section) => {
      section.fields.sort((a, b) => a.rank - b.rank);
      let newFiledsArr = JSON.parse(JSON.stringify(section.fields));
        for(let i = 0; i < section.fields.length; i++){
          let fieldGroupObj = {};
          fieldGroupObj.component = "field_group";
          fieldGroupObj.header = section.fields[i].store;
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

        if(section.section === "Create Table"){
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
    let data = {
      "vars": newSection
    };
    setFormData(data);
    history.push({pathname : "/preview", state: { formData : data}});
  };
  
  return (
  <>
    <Box sx={{ flexGrow: 1 }} className="box">
      <Grid container spacing={2}>
        <Grid item xs>
         <SectionCreate sectionArr={sectionArr} setSectionArr={setSectionArr} />
        </Grid>
        <Grid item xs={8} className="field-container">
        <Typography variant="h6" gutterBottom component="div">
          Fields
        </Typography>
        <form autoComplete="off">
          <Box className="fields-box-height">
            {fields && fields.length > 0 && fields.map((item, index) => (
              <Accordion className="accordion-container">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content" id="panel1a-header">
                  <Typography>{item.store}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <FieldSwitchCase item={item} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={true} />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            </Box>
          <Button variant="outlined" onClick={submitForm} style={{marginLeft: "1rem"}}>Submit</Button>
        </form>
        </Grid>
        {/* <Grid item xs>
        {formData && formData.vars && <Sections formData={formData?.vars} onChange={setVars} defaultValues={{}} /> }
        </Grid> */}
      </Grid>
    </Box> 
  </>
  );
};

export default Form;