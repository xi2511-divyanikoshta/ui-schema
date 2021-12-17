/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UiSchemaUploader from "../../components/UiSchemaUploader";
import JsonSchemaUploader from "../../components/JsonSchemaUploader";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const UploaderPage = () => {
    const history = useHistory();
    const [ fields, setFields ] = useState([]);
    const [ SectionArr, setSectionArr ] = useState([
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
      ]);

    const gotoNext = () => {
        history.push({pathname : "/form", state: { callFrom : "JsonSchema" , sectionArr: SectionArr, fields: fields}});
    }

    return (
        <>  
          <Box className="upload-container">
            <Typography className="m-t-1" variant="h6" gutterBottom component="div">
              Uploader
            </Typography>
            <JsonSchemaUploader setFields={setFields} />
            <UiSchemaUploader newfields={fields} setFields={setFields} setSectionArr={setSectionArr} SectionArr={SectionArr} />
            <button className="m-t-2" onClick={gotoNext}> go to next </button>
          </Box>
        </>    
    )
};

export default UploaderPage;