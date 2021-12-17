import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import '../App.css';

function SectionCreate({sectionArr, setSectionArr}) {
  const [sectionObj, setSectionObj] = useState({
    section: "",
    sectionDecs: "",
    expand : true,
    type : "input_block",
    id : "basic_Detail",
    fields : []
  });

  const handleSectionChange = (e) => {
    const {value, name} = e.target;
    setSectionObj({...sectionObj, [name] : value});
  }

  const addSection = () => {
    setSectionArr([...sectionArr, sectionObj]);
    setSectionObj({
      section: "",
      sectionDecs: "",
      expand : true,
      type : "",
      id : "",
      fields : []
    })
  };

    return (
      <Box className="section-container" >
        <Typography variant="h6" gutterBottom component="div">
          Add Section
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="section-field">
          <Grid item xs={6}>
            <TextField id="outlined-required" type="text" value={sectionObj.section} name="section" label="Section Name" onChange={handleSectionChange}/>
          </Grid>
          <Grid item xs={6}>
            <TextField id="outlined-required" type="text" value={sectionObj.sectionDecs} name="sectionDecs" label="Section Desc" onChange={handleSectionChange}/>
          </Grid>
        </Grid>
        <Box className="add-button">
          <Button variant="outlined" onClick={addSection} disabled={sectionObj.section === "" || sectionObj.section ===null } style={{marginLeft: "1rem"}}>Add</Button>
        </Box>
        <Box>
        <ul>
            {sectionArr && sectionArr.map((section, index) => (
            <li key={index}>
                {section.section}
            </li>
            ))}
        </ul>
        </Box>
      </Box>
    );
  }

export default SectionCreate;
