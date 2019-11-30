import React, { Component } from "react";
import { Form, Row, Col, Button, Alert } from "reactstrap";
import TextInput from "../components/Forms/TextInput";
import registerValidator from "../validator/registerValidator";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login } from "../store/actions/authAction";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
class Login extends Component {
  state = {
    email: {
      value: "",
      touched: false
    },
    password: {
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
  };

  submitHandler = event => {
    event.preventDefault();
    let { email, password } = this.state;
    let user = {
      email: email.value,
      password: password.value
    };
    this.props.login(user, this.props.history);
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
    let { email, password, error } = this.state;
    return (
      // <Row className="my-5">
      //   <Col md={{ size: 6, offset: 3 }}>
      //     <Form onSubmit={this.submitHandler}>
      //       <TextInput
      //         name="email"
      //         value={email.value}
      //         type="email"
      //         placeholder="Enter your email"
      //         label="Enter your email"
      //         change={this.changeHandler}
      //         error={error.email}
      //       />
      //       <TextInput
      //         name="password"
      //         value={password.value}
      //         placeholder="Enter your password"
      //         label="Enter your password"
      //         change={this.changeHandler}
      //         error={error.password}
      //         type="password"
      //       />
      //       <Button color="primary" type="submit" onSubmit={this.submitHandler}>
      //         Login
      //       </Button>
      //       <Link to="/forgot-password"> Forgot password </Link>
      //     </Form>
      //     {Object.keys(error).length > 0 && (
      //       <Alert className="my-4" color="danger">
      //         {Object.keys(error).map(err => {
      //           return <li>{error[err]}</li>;
      //         })}
      //       </Alert>
      //     )}
      //   </Col>
      // </Row>
      <MDBContainer className="section-padding">
        <MDBRow>
          <MDBCol md="3"></MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign in</strong>
                  </h3>
                </div>
                <Form onSubmit={this.submitHandler}>


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

                  <div className="text-center mb-3">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      type="submit"
                      className="btn-block z-depth-1a"
                    >
                      Sign in
                </MDBBtn>
                  </div>
                </Form>



              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
                <p className="font-small grey-text d-flex justify-content-end">
                  not a member?
                <Link to="/register" className="blue-text ml-1">

                    Sign Up
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
  { login }
)(withRouter(Login));
