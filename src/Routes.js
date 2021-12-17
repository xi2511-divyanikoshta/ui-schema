import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UploaderPage from "./pages/UploaderPage";
import PreviewPage from "./pages/PreviewPage";
import FormPage from "./pages/FormPage";

const Routes = () => (
    <Router>
      <Switch>
        <Route exact  path="/" component={UploaderPage} />
        <Route exact  path="/form" component={FormPage} />
        <Route exact  path="/preview" component={PreviewPage} />
      </Switch>
    </Router>
  );
  
  export default Routes;