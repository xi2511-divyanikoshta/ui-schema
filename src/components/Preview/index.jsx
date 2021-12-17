/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Sections from "../../components/CreateResource/Sections";

const Preview = ({formData}) => {
    const [vars, setVars] = useState({});
    return (
        <div>
           {formData && <Sections formData={formData?.vars} onChange={setVars} defaultValues={{}} /> }
        </div>
    )
};

export default Preview;