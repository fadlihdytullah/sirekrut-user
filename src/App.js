import React, { Fragment } from "react";
import "antd/dist/antd.css";
import AppBar from "./layouts/AppBar";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import PeriodeDetail from "./pages/PeriodeDetail";
import Submission from "./pages/Submission";
import Success from "./pages/Success";

const { Content } = Layout;

function App() {
  return (
    <Fragment>
      <AppBar />
      <div
        style={{
          marginTop: "24px",
          maxWidth: "960px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Content>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/periode/:id">
              <PeriodeDetail />
            </Route>

            <Route exact path="/submission">
              <Submission />
            </Route>

            <Route exact path="/success">
              <Success />
            </Route>
          </Switch>
        </Content>
      </div>
    </Fragment>
  );
}
export default App;
