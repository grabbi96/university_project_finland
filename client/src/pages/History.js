import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setToastMessage } from "../store/actions/metaAction";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { setPlaceAction } from "../store/actions/allAction"
import Moment from 'react-moment';
class History extends Component {
    state = {}
    render() {
        return (
            <div className="container">
                <div className="section-padding">
                    <h5>Previous History</h5>
                    <MDBTable>
                        <MDBTableHead color="primary-color" textWhite>
                            <tr>
                                <th>Date</th>
                                <th>Place</th>
                                <th>Duration</th>
                                <th>Bill</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.props.user.history && this.props.user.history.map(ht => {
                                return (
                                    <tr>
                                        <td>
                                            <Moment format="YYYY/MM/DD HH:mm">
                                                {ht.createdAt}
                                            </Moment>

                                        </td>
                                        <td>{ht.place}</td>
                                        <td>{ht.duration}</td>
                                        <td>{ht.bill}</td>
                                    </tr>
                                )
                            })}


                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        meta: state.meta,
        user: state.auth.user
    };
};
export default connect(
    mapStateToProps,
    { setToastMessage, setPlaceAction }
)(History);