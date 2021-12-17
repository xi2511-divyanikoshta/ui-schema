import React from "react";
import Preview from "../../components/Preview";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
    const location = useLocation();
    return (
       <Preview formData={location.state.formData}/>
    )
};

export default PreviewPage;