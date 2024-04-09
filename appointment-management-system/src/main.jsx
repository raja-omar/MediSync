import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./pages/App.jsx";
import DoctorScreen from "./pages/DoctorScreen.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route path="/doctorscreen" component={DoctorScreen} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={App} />
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
