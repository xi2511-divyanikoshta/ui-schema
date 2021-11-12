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

function SwitchCase({item, sectionArr, setSectionArr, askSection}) {

    const addNestedOption = (fields, count) => {
        for(let i = 0; i < fields.length; i++){
            if(fields[i].id === item.id){
                count ++;
                fields[i].options.push({
                    value: "",
                    label: ""
                })
                return fields;
            }
            fields[i].fields = addNestedOption(fields[i].fields ,count); 
        }
        return fields;
    };

    const addOption = (item) => {
        let count = 0;
        let newSection = sectionArr.map((section) => {
            let newField = section.fields.map((field) => {
             if(field.id === item.id){
                count ++;
                field.options.push({
                    value: "",
                    label: ""
                })
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
            if(fields[i].fields && "fields" in fields[i].fields){
                if(item.id === fields[i].fields.id){
                    count++;
                    let obj = {
                        item : fields[i].fields,
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
                            }
                    }
                    return obj;
                }
                return findNestedFieldModel(fields[i].fields, count, sectionInfo);
            }else{
                if(fields[i].id === item.id){
                    count++;
                    var obj = {
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
                         }
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
                    if(sectionArr[i].fields[j] && "fields" in sectionArr[i].fields[j]){
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
                                    }
                            }
                            return obj;
                        }
                        return findNestedFieldModel(sectionArr[i].fields[j].fields, count, sectionArr[i]);
                    }else{
                        if(sectionArr[i].fields.id === item.id){
                            count++;
                            let obj = {
                                item : sectionArr[i].fields,
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
                                 }
                            }
                            return obj;
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
    console.log("fieldModel==========", fieldModel);

    const handleChangeForNestedFields = (fields, item, e) => {
        const {value, name} = e.target;
        for(var i = 0; i < fields.length ; i++ ){
            if(fields[i].fields && "fields" in fields[i].fields){
                fields[i].fields =  handleChangeForNestedFields(item, e);
            }else{
                if(item.id === fields[i].id) {
                    if(name === "component"){
                        let optionsArr = [];
                        if(value === "singleSelect" || "multiSelect") {
                            let options = {
                                            value: "",
                                            label: ""
                                        };
                            optionsArr.push(options);          
                            fields[i].options = optionsArr;
                        }else{
                            delete(fields[i].options);
                        }
                    }
                    fields[i][name] = value;
                }
            }
           
        }
        return fields;
    };

    const handleChange = async(e, item) => {
        const {value, name} = e.target;
        let newSection = sectionArr.map((section) => {
            let newField;
            if(askSection){
                newField = section.fields.map((field) => {
                    if(field.id === item.id){
                        if(name === "component"){
                            let optionsArr = [];
                            if(value === "singleSelect" || "multiSelect") {
                                let options = {
                                                value: "",
                                                label: ""
                                            };
                                optionsArr.push(options);          
                                field = {...field, "options" : optionsArr};
                            }else{
                                delete(field.options);
                            }
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
        for (let i = 0; i < sectionArr.length; i++) {
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
                fields : item.fields || 0
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

    const onOptionChange = (e, index) => {
        let newSection = sectionArr.map((section) => {
            let newField = section.fields.map((field) => {
             if(field.id === item.id){
                field.options[index].label = e.target.value;
             }
             return field;
            });
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
                   <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                    <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                        <MenuItem value="input">Input</MenuItem>
                        <MenuItem value="singleSelect">Select (Drop down)</MenuItem>
                        <MenuItem value="toggle">Toggle</MenuItem>
                    </Select>
                    {fieldModel.item.component && fieldModel.item.component === "singleSelect" && 
                    <Box>
                        <AddCircleOutlineOutlinedIcon onClick={() => addOption(item)}/>
                    </Box>}
                    {fieldModel.item.component && fieldModel.item.component === "singleSelect" && fieldModel.item.options && fieldModel.item.options.map((option, index) => (
                        <Box>
                            <TextField required value={option.label} type="text" label="Option" onChange={(event) => onOptionChange(event, index)} />
                            <TextField required type="text" label="Value" />
                        </Box>
                    ))}
                </>
            );  
        
        case "arrayString" : 
            return ( 
            <>
                <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                    <MenuItem value="multiInput">Multi Input</MenuItem>
                    <MenuItem value="multiSelect">Multi Select</MenuItem>
                </Select>
                {fieldModel.item.component && fieldModel.item.component === "multiSelect" && 
                    <Box>
                        <AddCircleOutlineOutlinedIcon onClick={() => addOption(item)}/>
                    </Box>}
                    {fieldModel.item.component && fieldModel.item.component === "multiSelect" && fieldModel.item.options && fieldModel.item.options.map((option, index) => (
                        <Box>
                            <TextField required value={option.label} type="text" label="Option" onChange={(event) => onOptionChange(event, index)} />
                            <TextField required type="text" label="Value" />
                        </Box>
                    ))}
            </>
        );

        case "arrayOfObjectWithThreeElement" : 
            return (
                <>
                <div>hello from array of objects, object with not greater then 3 element</div>

                <InputLabel id="demo-simple-select-label">Input Type (Component)</InputLabel>
                <Select name="component" value={fieldModel.item.component} style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                    <MenuItem value="rawInput">Raw Input</MenuItem>
                    <MenuItem value="array_group">Array group</MenuItem>
                </Select>
                {fieldModel.item.component && fieldModel.item.component === "array_group" && item.fields && item.fields.length > 0 && item.fields.map((item, index) => (
                    <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}  aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>{item.store}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        <SwitchCase item={item} sectionArr={sectionArr} setSectionArr={setSectionArr} askSection={false} />
                        </Typography>
                    </AccordionDetails>
                    </Accordion>
                ))}
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
                            <MenuItem key={section.id} value={section.sectionName}>{section.sectionName}</MenuItem>
                        ))}
                    </Select>
                </div>
            }
            
            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField required type="text" value={fieldModel.item.label} name="label" label="Label" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField type="text" name="hint" value={fieldModel.item.hint} label="Hint" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField type="number" name="rank" value={fieldModel.item.rank} label="Rank" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && <TextField type="text" name="defaultValue" value={fieldModel.item.defaultValue} label="Default Value" onChange={(e)=>handleChange(e, item)} />}

            {fieldModel.sectionObj && fieldModel.sectionObj.sectionName && 
                <Select name="required" style={{width : "224px"}}  onChange={(e)=>handleChange(e, item)} >
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                </Select>
            }

            {renderSwitch(item)}
       </div>
    );
}

export default SwitchCase; 