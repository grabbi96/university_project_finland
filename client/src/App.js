import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Header from "./components/Header/Header";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegistrationSuccessFul from "./pages/RegistrationSuccessFul";
import Profile from "./pages/Profile"
import GetCharge from "./pages/GetCharge"
import History from "./pages/History"
import "./style/style.css"
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { UserPrivateRoute } from "./components/PrivateRoute"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Container>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route
              path="/registration-successful"
              component={RegistrationSuccessFul}
            />
            <UserPrivateRoute path="/profile" component={Profile} />
            <UserPrivateRoute path="/get-charge" component={GetCharge} />
            <UserPrivateRoute path="/history" component={History} />
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
