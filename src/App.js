import './App.css';
import data from "./json-schema.json";
import { useState } from 'react';

function App() {
  const[jsonSchema, setJsonSchema] = useState(data);
  let storeData = "";

  const createFields = (jsonSchema, store) => {
    if(jsonSchema.type === "object"){
      for (const property in jsonSchema.properties) {
        if(jsonSchema.properties[property].type === "object"){
          const values = jsonSchema.properties[property];
          store += property + ".";
          console.log("inside if-----", property);
          createFields(values, store);     
          store = store.substring(0, store.length - 1);     
          let strArr = store.split(".");
          store = "";
          for(let i=0; i<(strArr.length-1);i++){
            store += strArr[i] + ".";
          }
        }else{
          store += property;
          console.log("inside else--------field found", property, "store---", store);
          let strArr = store.split(".");
          store = "";
          for(let i=0; i<(strArr.length-1);i++){
            store += strArr[i] + ".";
          }
        }
      }
    }
  };
  createFields(jsonSchema, storeData);
  return (
    <div>json schema</div>
  );
}

export default App;
