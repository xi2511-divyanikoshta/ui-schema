import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

function SwitchCase({item, sectionArr, setSectionArr, askSection}) {
    const addNestedOption = (fieldsList, count) => {
        let newFieldList = fieldsList.map((fieldData) => {
            let newField = {};
            if(fieldData.fields){
                newField = fieldData.fields.map((field) => {
                    if(field.id === item.id){
                        count ++;
                        field.option.push({
                            value: "",
                            label: ""
                        })
                    } 
                    return field;
               })
            }
            
            if(count === 0 && fieldData.fields){
                newField = addNestedOption(fieldData.fields, count);
            }
           newField.fields = fieldData;
           return fieldData;
        })
        return newFieldList;
    };

    const addOption = (item, inputType) => {
        let count = 0;
        let newSection = sectionArr.map((section) => {
            let newField = section.fields.map((field) => {
             if(field.id === item.id){
                count ++;
                if(inputType === "dropDown"){
                    field.option.push({
                        value: "",
                        label: ""
                    })
                }else{
                    field.option.push({
                        value: "",
                        name: ""
                    })
                }
             }
             return field;
            });
            if(count === 0){
                newField = addNestedOption(section.fields, count);
            }

            section.fields = newField;
            return section;
         });
         setSectionArr(newSection);
    }

    const findNestedFieldModel = (fields, count, sectionInfo) => {
        for(let i = 0; i < fields.length; i++ ){
            if(fields[i].fields && fields[i].fields.length !== 0){
                if(item.id === fields[i].id){
                    count++;
                    let obj = {
                        item : fields[i],
                        sectionObj : {
                                sectionName: sectionInfo.sectionName,
                                sectionDecs:  sectionInfo.sectionDecs,
                                expand : true,
                                type : "input_block",
                                id : "basic_Detail",
                                fields : sectionInfo.fields,
                                defaultValue : sectionInfo.defaultValue,
                                hint : sectionInfo.hint,
                                rank : sectionInfo.rank,
                                required : sectionInfo.required,
                                option : sectionInfo.option
                            }
                    }
                    if(sectionInfo.sectionName === "Create Table"){
                        obj.sectionObj["visible"] =  sectionInfo.visible;
                        obj.sectionObj["tableData"] = sectionInfo.tableData;
                    }
                    return obj;
                }
                return findNestedFieldModel(fields[i].fields, count, sectionInfo);
            }else{
                if(fields[i].id === item.id){
                    count++;
                    let obj = {
                        item : fields[i],
                        sectionObj : {
                             sectionName: sectionInfo.sectionName,
                             sectionDecs:  sectionInfo.sectionDecs,
                             expand : true,
                             type : "input_block",
                             id : "basic_Detail",
                             fields : sectionInfo.fields,
                             defaultValue : sectionInfo.defaultValue,
                             hint : sectionInfo.hint,
                             rank : sectionInfo.rank,
                             required : sectionInfo.required,
                             option : sectionInfo.option
                         }
                    }
                    if(sectionInfo.sectionName === "Create Table"){
                        obj.sectionObj["visible"] =  sectionInfo.visible;
                        obj.sectionObj["tableData"] = sectionInfo.tableData;
                    }
                    return obj;
                }
            }
        }
    }

    const findFieldModel = () => {
        let count = 0;
        for(var i=0;i<sectionArr.length;i++){
                for(let j = 0; j<sectionArr[i].fields.length; j++){
                    if(sectionArr[i].fields[j].id === item.id){
                        count++;
                        let obj = {
                            item : sectionArr[i].fields[j],
                            sectionObj : {
                                 sectionName: sectionArr[i].sectionName,
                                 sectionDecs:  sectionArr[i].sectionDecs,
                                 expand : true,
                                 type : "input_block",
                                 id : "basic_Detail",
                                 fields : sectionArr[i].fields,
                                 defaultValue : sectionArr[i].defaultValue,
                                 hint : sectionArr[i].hint,
                                 rank : sectionArr[i].rank,
                                 required : sectionArr[i].required,
                                 option : sectionArr[i].option
                             }                             
                        }
                        if(sectionArr[i].sectionName === "Create Table"){
                            obj.sectionObj["visible"] =  sectionArr[i].visible;
                            obj.sectionObj["tableData"] = sectionArr[i].tableData;
                        }
                        return obj;
                    }else{
                        if(sectionArr[i].fields[j] && sectionArr[i].fields[j].fields && sectionArr[i].fields[j].fields.length !== 0){
                            if(item.id === sectionArr[i].fields[j].id){
                                count++;
                                let obj = {
                                    item : sectionArr[i].fields[j],
                                    sectionObj : {
                                            sectionName: sectionArr[i].sectionName,
                                            sectionDecs:  sectionArr[i].sectionDecs,
                                            expand : true,
                                            type : "input_block",
                                            id : "basic_Detail",
                                            fields : sectionArr[i].fields,
                                            defaultValue : sectionArr[i].defaultValue,
                                            hint : sectionArr[i].hint,
                                            rank : sectionArr[i].rank,
                                            required : sectionArr[i].required,
                                            option : sectionArr[i].option
                                        }
                                }
                                if(sectionArr[i].sectionName === "Create Table"){
                                    obj.sectionObj["visible"] =  sectionArr[i].visible;
                                    obj.sectionObj["tableData"] = sectionArr[i].tableData;
                                }
                                return obj;
                            }
                            let result = findNestedFieldModel(sectionArr[i].fields[j].fields, count, sectionArr[i]);
                            if(typeof result !== "undefined"){
                                return result;
                            }
                        }
                    }
                }
        }
        if (count === 0){
            let obj = {
                item,
                sectionObj: {}
            }
            return obj;
        }
    }

    let fieldModel = findFieldModel();
    // console.log("fieldModel==========", fieldModel);

    const handleChangeForNestedFields = (fields, item, e) => {
        const {value, name} = e.target;
        for(var i = 0; i < fields.length ; i++ ){
            if(item.id === fields[i].id) {
                if(name === "component"){
                    let optionsArr = [];
                    if(value === "singleSelect" || value === "multiSelect") {
                        let options = {
                                        value: "",
                                        label: ""
                                    };
                        optionsArr.push(options);          
                        fields[i].option = optionsArr;
                    }else{
                        delete(fields[i].option);
                    }
                }
                fields[i][name] = value;
            }
            else if(fields[i] && "fields" in fields[i]){
                fields[i].fields =  handleChangeForNestedFields(fields[i].fields, item, e);
            }
        }
        return fields;
    };

    const handleChange = async(e, item) => {
        const {value, name} = e.target;
        let newSection = sectionArr.map((section) => {
            let newField = [];
            if(askSection){
                newField = section.fields.map((field) => {
                    if(field.id === item.id){
                        if(name === "component"){
                            let optionsArr = [];
                            if(value === "singleSelect" ||  value === "multiSelect") {
                                let options = {
                                                value: "",
                                                label: ""
                                            };
                                optionsArr.push(options);          
                                field = {...field, "option" : optionsArr};
                            }else if(value === "toggle"){
                                let options = {
                                    value: "",
                                    name: ""
                                };
                                optionsArr.push(options);          
                                field = {...field, "option" : optionsArr};
                            }else{
                                delete(field.option);
                            }
                        }else if(name === "visible"){
                            section.tableData[name] = value;
                        }
                        return {...field, [name]: value}
                    }
                    return field;
                   });
            }else {
                newField = section.fields.map((field) => {
                    if(field && "fields" in field){
                        field.fields = handleChangeForNestedFields(field.fields, item, e);
                    }
                    return field;
                });
            }
           
           section.fields = newField;
           return section;
        });
        setSectionArr(newSection);
    };

    const handleSectionChange = (e, item) => {
        const {value} = e.target;
        let newField = {};
        let count = 0;
        for(let i = 0; i < sectionArr.length; i++) {
            for(let j = 0; j < sectionArr[i].fields.length; j++){
                if(sectionArr[i].fields[j].id === item.id){
                        let index = sectionArr[i].fields.findIndex(field => field.id === item.id);
                        newField = sectionArr[i].fields[j];
                        sectionArr[i].fields.splice(index,1);
                        count++;
                    break;
                }
            }
        }

        if(count === 0 ){
            newField = {
                component: item.component,
                label: item.label || "",
                type: item.type,
                defaultValue: item.defaultValue,
                id: item.id,
                hint: item.hint,
                store: item.store,
                rank: item.rank,
                fields : item.fields || [],
                required : item.required,
                option : item.option
            }
        }

        if(newField.fields.length === 0){
            delete (newField.fields);
        }

        let newArr = sectionArr.map((section) => {
                       if(section.sectionName === value){
                        section.fields.push(newField);
                       }
                       return section;
                    })
         setSectionArr(newArr);
    };

    const onNestedOptionChange = (e, index, fieldList, count) => {
        const {value, name} = e.target;
        let fieldObj = fieldList.map((fieldData) => {
            let newField = fieldData;
            if(fieldData.fields){
                newField = fieldData.fields.map((field) => {
                    if(field.id === item.id){
                        count++;
                        field.options[index][name] = value;
                    } 
                return field;
               })
            }
           if(count === 0 && fieldData.fields){
                newField = onNestedOptionChange(e, index, fieldData.fields, count);
            }
            if(fieldData.fields){
                fieldData.fields = newField;
            }else{
                fieldData = newField;
            }
            
            return fieldData;
        })
        return fieldObj;
    }

    const onOptionChange = (e, index) => {
        let count = 0;
        const {value, name} = e.target;
        let newSection = sectionArr.map((section) => {
            let newField = section.fields.map((field) => {
                if(field.id === item.id){
                    count++;
                    field.option[index][name] = value;
                }
                return field;
            });
            if(count === 0){
                newField = onNestedOptionChange(e, index, section.fields, count);
            }
            section.fields = newField;
            return section;
        });
        setSectionArr(newSection);
    }

    const renderSwitch = (item) => {
        switch(item.jsonSchemaType) {
        case "string":
            return (
                <>  
                   {(fieldModel.sectionObj && fieldModel.sectionObj.sectionName) &&
                        <div>
                            <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                            <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                                <MenuItem value="input">Input</MenuItem>
                                <MenuItem value="singleSelect">Select (Drop down)</MenuItem>
                                <MenuItem value="toggle">Toggle</MenuItem>
                            </Select>
                        </div>                        
                    }
                   
                    {fieldModel.item.component && fieldModel.item.component === "singleSelect" && 
                    <Box>
                        <AddCircleOutlineOutlinedIcon onClick={() => addOption(item, "dropDown")}/>
                    </Box>}
                    {fieldModel.item.component && fieldModel.item.component === "singleSelect" && fieldModel.item.option && fieldModel.item.option.map((data, index) => (
                        <Box>
                            <TextField required value={data.label} type="text" label="Label" name="label" onChange={(event) => onOptionChange(event, index)} />
                            <TextField required value={data.value} type="text" label="Value" name="value" onChange={(event) => onOptionChange(event, index)} />
                        </Box>
                    ))}

                    {fieldModel.item.component && fieldModel.item.component === "toggle" && 
                    <Box>
                        <AddCircleOutlineOutlinedIcon onClick={() => addOption(item, "toggle")}/>
                    </Box>}
                    {fieldModel.item.component && fieldModel.item.component === "toggle" && fieldModel.item.option && fieldModel.item.option.map((data, index) => (
                        <Box>
                            <TextField required value={data.name} type="text" label="Name" name="name" onChange={(event) => onOptionChange(event, index)} />
                            <TextField required value={data.value} type="text" label="Value" name="value" onChange={(event) => onOptionChange(event, index)} />
                        </Box>
                    ))}
                </>
            );  
        
        case "arrayString" : 
            return ( 
            <>
                {(fieldModel.sectionObj && fieldModel.sectionObj.sectionName) &&
                    <div>
                        <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                        <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                            <MenuItem value="multiInput">Multi Input</MenuItem>
                            <MenuItem value="multiSelect">Multi Select</MenuItem>
                        </Select>
                    </div>
                }    
                {fieldModel.item.component && fieldModel.item.component === "multiSelect" && 
                    <Box>
                        <AddCircleOutlineOutlinedIcon onClick={() => addOption(item)}/>
                    </Box>}
                    {fieldModel.item.component && fieldModel.item.component === "multiSelect" && fieldModel.item.option && fieldModel.item.option.map((data, index) => (
                        <Box>
                            <TextField required value={data.label} type="text" label="Label" name="label" onChange={(event) => onOptionChange(event, index)} />
                            <TextField required value={data.value} type="text" label="Value" name="value" onChange={(event) => onOptionChange(event, index)} />
                        </Box>
                    ))}
            </>
        );

        case "arrayOfObjectWithThreeFields" : 
            return (
                <>

                {(fieldModel.sectionObj && fieldModel.sectionObj.sectionName) &&
                    <div>
                        <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                        <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                            <MenuItem value="rawInput">Raw Input</MenuItem>
                            <MenuItem value="array_group">Array group</MenuItem>
                        </Select>
                    </div>
                }
                {fieldModel.item.component && fieldModel.item.component === "array_group" && item.fields && item.fields.length > 0 && item.fields.map((data, index) => (
                    <div>
                        <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>{data.store}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            <SwitchCase item={data} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={false} />
                            </Typography>
                        </AccordionDetails>
                        </Accordion>
                    </div>                    
                ))}
                </>
            );

        case "arrayOfObjectGreaterThenThreeFields" : 
            return (
                <>
                    { fieldModel.sectionObj && fieldModel.sectionObj.sectionName && fieldModel.sectionObj.sectionName !== "Create Table" && 
                       <div>
                        <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                        <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                            <MenuItem value="rawInput">Raw Input</MenuItem>
                        </Select>
                       </div>
                    }
                    {   fieldModel.sectionObj.sectionName === "Create Table"  && item.fields && item.fields.length > 0 && item.fields.map((data, index) => (
                            <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>{data.store}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                <SwitchCase item={data} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={false} />
                                </Typography>
                            </AccordionDetails>
                            </Accordion>
                        ))
                    }
                    
                </>
            );

            case "nestedArrayOfObjectGreaterThenThreeFields" : 
            return (
                <>
                    <div>
                       <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                        <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                            <MenuItem value="rawInput">Raw Input</MenuItem>
                        </Select>
                    </div>
                    {   fieldModel.item.component !== "rawInput" && fieldModel.sectionObj.sectionName === "Create Table"  && item.fields && item.fields.length > 0 && item.fields.map((data, index) => (
                            <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>{data.store}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                <SwitchCase item={data} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={false} />
                                </Typography>
                            </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </>
            );
            
            case "arrayOfObjectGreaterThenThreeFieldsHavingNestedArrayOrObject" : 
            return (
                <>
                    {   fieldModel.sectionObj && fieldModel.sectionObj.sectionName && fieldModel.sectionObj.sectionName !== "Create Table" && 
                       <div>
                       <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                        <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                            <MenuItem value="rawInput">Raw Input</MenuItem>
                        </Select>
                       </div>
                    }
                    {   fieldModel.sectionObj.sectionName === "Create Table"  && item.fields && item.fields.length > 0 && item.fields.map((data, index) => (
                            <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{data.store}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                <SwitchCase item={data} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={false} />
                                </Typography>
                            </AccordionDetails>
                            </Accordion>
                        ))
                    }
                    { fieldModel.sectionObj.sectionName === "Create Table" &&
                        <div>
                            <InputLabel id="demo-simple-select-label">Visible</InputLabel>
                            <Select 
                                name="visible"
                                style={{width : "224px"}}
                                multiple 
                                value={fieldModel.sectionObj.tableData.visible}
                                onChange={(e) => handleChange(e, item)}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {item.fields && item.fields.map(data => (
                                    <MenuItem key={data.id} value={data.name}>
                                    <Checkbox checked={fieldModel.sectionObj.tableData.visible.indexOf(data.name) > -1} />
                                    <ListItemText primary={data.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    }
                </>
            );

            case "array" : 
            return (
                <>
                    <div>hello from array</div>
                </>
            );

        default:
            return null;
        }
    };
      
    return (
       <div>
            {askSection && 
                <div>
                    <InputLabel id="demo-simple-select-label">Section</InputLabel>
                    <Select name="section" value={fieldModel.sectionObj.sectionName} style={{width : "224px"}} onChange={(e)=>handleSectionChange(e, item)} >
                        {sectionArr && sectionArr.map(section => (
                            <MenuItem key={section.id} value={section.sectionName} disabled={(section.sectionName === "Create Table" && !(item.jsonSchemaType === "arrayOfObjectGreaterThenThreeFieldsHavingNestedArrayOrObject" || item.jsonSchemaType === "arrayOfObjectGreaterThenThreeFields"))} >{section.sectionName}</MenuItem>
                        ))}
                    </Select>
                </div>
            }
            
            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField required type="text" value={fieldModel.item.label} name="label" label="Label" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField type="text" name="hint" value={fieldModel.item.hint} label="Hint" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField required type="number" name="rank" value={fieldModel.item.rank} label="Rank" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField type="text" name="defaultValue" value={fieldModel.item.defaultValue} label="Default Value" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && 
                <div>
                    <InputLabel id="demo-simple-select-label">Required</InputLabel>
                    <Select value={fieldModel.item.required} name="required" style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </div>
            }

            {renderSwitch(item)}
       </div>
    );
}

export default SwitchCase; 