import React, { Component } from "react";
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
class Home extends Component {
    state = {
        selectPlaceArea: false,
        latLng: {},
        address: "",
        options: [
            {
                text: "Virta Global Charging Station",
                value: ["Hallituskatu 1, 90100 Oulu", "65.0155163", "25.4642668"].join("|")
            },
            {
                text: "Virta Global Charging Station",
                value: ["Kasarmintie 6, 90100 Oulu", "65.0175543", "25.4799029"].join("|")
            },
            {
                text: "Railway Station",
                value: ["Rautatienkatu 9, 90130 Oulu", "65.0113355", "25.4810572"].join("|")
            },
            {
                text: "Aimo Park Uusikatu 2",
                value: ["Uusikatu 2, 90100 Oulu", "65.0156149", "25.4787828"].join("|")
            },
            {
                text: "Tesla Destination Charger",
                value: ["Kirkkokatu 3, 90100 Oulu", "65.0154693", "25.4736928"].join("|")
            },
            {
                text: "Virta Global Charging Station",
                value: ["Saaristonkatu 4, 90100 Oulu", "65.0118669", "25.4633808"].join("|")
            },
            {
                text: "electric car charging point",
                value: ["Kallisensuora 6, 90400 Oulu", "65.9924693", "25.4582402"].join("|")
            },
            {
                text: " Virta Global Charging Station",
                value: ["Kaakkurinkulma 4, 90420 Oulu", "65.9621737", "25.5185506"].join("|")
            },
            {
                text: "Virta Global Charging Station",
                value: ["Ritaharjuntie 49, 90540 Oulu", "65.0775978", "25.4448002"].join("|")
            },
            {
                text: "Aimo Park Pilotpark",
                value: ["Lentokatu 2, 90460 Oulunsalo", "65.9309112", "25.3801113"].join("|")
            },
            {
                text: "Tesla Destination Charger",
                value: [" Haminantie 32, 91100 II", "65.3267082", "25.3728175"].join("|")
            },
            {
                text: "Oulun Energia Charging Station",
                value: ["7, 95110 Ii", "65.3226858", "25.3637589"].join("|")
            },
            {
                text: "Napapiirin Energia ja Vesi Charging Station",
                value: ["Nelostie, 95350 Peura", "65.0155163", "25.4642668"].join("|")
            },
            {
                text: "Rovaniemen Verkko Charging Station",
                value: ["Kuukkelintie 1, 96400 Rovaniemi", "66.4934433", "25.7632938"].join("|")
            },
            {
                text: "Rovaniemen Verkko Charging Station",
                value: ["96100 Lappi", "66.5509437", "25.5298802"].join("|")
            },
        ]
    };
    componentDidMount() {
        if (this.props.meta.toastMessage) {
            toast.success(this.props.meta.toastMessage, {
                position: toast.POSITION.TOP_RIGHT,
                onClose: () => this.props.setToastMessage()
            });
        }

    }
    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({
            address
        })
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({
                    latLng
                })
                console.log(this.state)
            })
            .catch(error => console.error('Error', error));
    };
    selectPlaceHandler = () => {
        this.setState({
            selectPlaceArea: !this.state.selectPlaceArea
        })
    }
    formCheck = () => {
        let { address, latLng } = this.state
        if (!address || !latLng.lat) {
            return true
        }
        return false
    }
    searchSubmit = () => {
        let data = {
            address: this.state.address,
            lat: this.state.latLng.lat,
            lng: this.state.latLng.lng
        }
        this.props.setPlaceAction(data, this.props.history)
    }
    reflance = () => {

    }
    changeHandler = e => {
        let values = e.target.value.split("|")
        let data = {
            address: values[0],
            lat: values[1],
            lng: values[2]
        }
        this.props.setPlaceAction(data, this.props.history)

    }
    render() {
        if (this.props.meta.place.address && !this.state.address) {
            window.location.reload(false);
        }
        return (
            <section className="section-padding">
                <Container>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <select className="browser-default custom-select" onChange={this.changeHandler}>
                                <option>Choose from your selected places</option>
                                {this.state.options && this.state.options.map(op => (
                                    <option value={op.value}>{op.text}</option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <ToastContainer />
                    <MDBBtn className="mb-4" color={!this.state.selectPlaceArea ? "primary" : "danger"} onClick={this.selectPlaceHandler}> {!this.state.selectPlaceArea ? "Select Place" : "close"} </MDBBtn>
                    {this.state.selectPlaceArea && (
                        <div>
                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <div className="form-group icon-parent">
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Search Places ...',
                                                    className: 'location-search-input form-control round',
                                                })}
                                                required
                                            />
                                        </div>


                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            <MDBBtn color="primary" disabled={this.formCheck()} onClick={this.searchSubmit}>Search place</MDBBtn>
                        </div>

                    )}
                    <div className="section-padding d-block">
                        <Link to="history" className="btn btn-outline-primary Ripple-parent">Previous History</Link>
                    </div>

                </Container>



            </section>

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
)(Home);



