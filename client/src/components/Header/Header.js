import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  Container,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { MDBNavbar } from "mdbreact"
import LoginNavbar from "./LoginNavbar";
import LogoutNavbar from "./LogoutNavbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    console.log(this.props.user);
  }
  render() {
    return (
      <div>
        <MDBNavbar color="indigo" dark expand="md" >
          <Container>
            <NavbarBrand> <Link className="charging-point" to="/">Charging Point</Link> </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {this.props.user.isAuthenticate ? (
                <LoginNavbar />
              ) : (
                  <LogoutNavbar />
                )}
            </Collapse>
          </Container>
        </MDBNavbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default withRouter(connect(mapStateToProps)(Header));
