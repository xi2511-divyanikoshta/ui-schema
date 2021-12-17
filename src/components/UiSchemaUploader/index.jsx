/* eslint-disable no-unused-vars */
import React from "react";
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState, useCallback, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from "react-dropzone";


const UiSchemaUploader = ({newfields, setFields, setSectionArr}) => {
  let sectionArr = {};
  let fieldsArr = [];

  const run = () => {
    for(let i = 0; i < sectionArr.length; i++){
      for(let j = 0; j < sectionArr[i].fields.length; j++ ){
        let counter = 0;
        for(let k = 0; k < newfields.length; k++){
          if(newfields[k].store === sectionArr[i].fields[j].store){
            counter++;
          }
        }
        if(counter !== 0){
          sectionArr[i].fields.splice(j, 1);
        }
      }
    }

    let newSectionArr = sectionArr.map((section) => {
      let fields = section.fields.map((field) => {
        fieldsArr.push(field);
        return field;
      })
      section.fields = fields;
      return section;
    })
    setSectionArr(sectionArr);
    setFields(fieldsArr);
  }

    const onDrop = useCallback((draggedFiles) => {
        let tempFileMap = {};
        draggedFiles.forEach((file, index) => {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
           sectionArr = JSON.parse(reader.result).vars;
           run();
            tempFileMap[file.path] = arrayBufferToBase64(reader.result);
            if (index === draggedFiles.length - 1) {
              setFileMap(tempFileMap);
              tempFileMap = {};
            }
          };
        });
      }, [newfields]);

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
                : <p>Click to select UI schema file</p>}
            </div>
        </Box>
    )
};

export default UiSchemaUploader;