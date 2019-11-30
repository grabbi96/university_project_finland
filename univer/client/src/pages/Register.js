import React, { Component } from "react";
import { Form, Row, Col, Button, Alert } from "reactstrap";
import TextInput from "../components/Forms/TextInput";
import registerValidator from "../validator/registerValidator";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { register } from "../store/actions/authAction";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
class Register extends Component {
  state = {
    name: {
      value: "",
      touched: false
    },
    email: {
      value: "",
      touched: false
    },
    password: {
      value: "",
      touched: false
    },
    confirmPassword: {
      value: "",
      touched: false
    },
    error: {}
  };
  changeHandler = event => {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        value: event.target.value
      }
    });

    let error = registerValidator(this.state);

    if (Object.keys(error).length > 0) {
      this.setState({ error });
    } else {
      this.setState((prevState, props) => {
        return {
          error: {}
        };
      });
    }
  };
  focusHandler = event => {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        touched: true
      }
    });
  };
  blurHandler = event => {
    let error = registerValidator(this.state);

    if (Object.keys(error).length > 0) {
      this.setState({ error });
    } else {
      this.setState((prevState, props) => {
        return {
          error: {}
        };
      });
    }
  };
  submitHandler = event => {
    event.preventDefault();
    let { name, email, password, confirmPassword } = this.state;
    let user = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };
    this.props.register(user, this.props.history);
    console.log(this.props.error);
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.error) !== JSON.stringify(prevState.error)) {
      return {
        error: nextProps.error
      };
    }
    return null;
  }
  render() {
    let { name, email, password, confirmPassword, error } = this.state;
    return (

      <MDBContainer className="section-padding">
        <MDBRow>
          <MDBCol md="3"></MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign Up</strong>
                  </h3>
                </div>
                <Form onSubmit={this.submitHandler}>
                  <MDBInput
                    label="Enter your name"
                    name="name"
                    value={name.value}
                    onChange={this.changeHandler}
                    group
                    type="text"
                    className={!error.name ? "is-valid" : "is-invalid"}
                  />
                  {error.name && (
                    <div className="invalid-feedback">{error.name}</div>
                  )}

                  <MDBInput
                    label="Enter your Email"
                    name="email"
                    value={email.value}
                    onChange={this.changeHandler}
                    group
                    type="email"
                    className={!error.email ? "is-valid" : "is-invalid"}
                  />
                  {error.email && (
                    <div className="invalid-feedback">{error.email}</div>
                  )}

                  <MDBInput
                    label="Enter your password"
                    name="password"
                    value={password.value}
                    onChange={this.changeHandler}
                    group
                    type="password"
                    className={!error.password ? "is-valid" : "is-invalid"}
                  />
                  {error.password && (
                    <div className="invalid-feedback">{error.password}</div>
                  )}

                  <MDBInput
                    label="Enter your name"
                    name="confirmPassword"
                    value={name.confirmPassword}
                    onChange={this.changeHandler}
                    group
                    type="password"
                    className={!error.confirmPassword ? "is-valid" : "is-invalid"}
                  />
                  {error.confirmPassword && (
                    <div className="invalid-feedback mb-4">{error.confirmPassword}</div>
                  )}
                  <div className="text-center mb-3">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      type="submit"
                      className="btn-block z-depth-1a"
                    >
                      Sign Up
                </MDBBtn>
                  </div>
                </Form>



              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  a member?
                <Link to="/login" className="blue-text ml-1">

                    Sign In
                </Link>
                </p>
              </MDBModalFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  { register }
)(withRouter(Register));


