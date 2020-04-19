import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Upload from "./components/Upload/Upload";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login";
import DoctorDashboard from "./components/DoctorDashboard/DoctorDashboard";
import Forum from "./components/Forum/Forum";
// import Upload from "./components/Upload/Upload";
import ML from "./components/ML/ML";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/forum">
          <Forum />
        </Route>
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/doc-dashboard">
          <DoctorDashboard />
        </Route>
        <Route path="/ml">
          <ML />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
