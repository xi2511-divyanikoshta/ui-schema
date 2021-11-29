import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function SectionCreate({sectionArr, setSectionArr}) {
  const [sectionObj, setSectionObj] = useState({
    sectionName: "",
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
      sectionName: "",
      sectionDecs: "",
      expand : true,
      type : "",
      id : "",
      fields : []
    })
  };

    return (
      <Box>
        <TextField id="outlined-required" type="text" value={sectionObj.sectionName} name="sectionName" label="Section Name" onChange={handleSectionChange}/>
        <TextField id="outlined-required" type="text" value={sectionObj.sectionDecs} name="sectionDecs" label="Section Desc" onChange={handleSectionChange}/>
        <Button variant="outlined" onClick={addSection} disabled={sectionObj.sectionName === "" || sectionObj.sectionName ===null } style={{marginLeft: "1rem"}}>Add</Button>
        <Box>
        <ul>
            {sectionArr && sectionArr.map((section, index) => (
            <li key={index}>
                {section.sectionName}
            </li>
            ))}
        </ul>
        </Box>
      </Box>
    );
  }

export default SectionCreate;
