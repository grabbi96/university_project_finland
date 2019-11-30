import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setToastMessage } from "../store/actions/metaAction";
import GoogleMap from "../components/GoogleMap"
import { MDBBtn, MDBInput, MDBModal, MDBModalHeader, MDBModalFooter, MDBModalBody, MDBAlert } from "mdbreact";
import { runInThisContext } from "vm";
import { createHistory } from "../store/actions/authAction"
class GetCharge extends Component {
    state = {
        code: "",
        count: 0,
        promoCode: "",
        codeCheck: false,
        message: "",
        duration: "",
        bill: "",
        modal: false
    };
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    tick = () => {
        this.setState({ count: (this.state.count + 1) })
    }
    startTimer = () => {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick, 1000)
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    closeToggle = () => {
        this.setState({
            modal: false
        })
        this.props.history.push("/profile")
    }
    stopTimer = () => {
        clearInterval(this.timer)
        let mins = Math.ceil(this.state.count / 60);
        let bill = mins * 0.20
        let data = {
            place: this.props.meta.place.address,
            duration: this.secondsToHms(this.state.count),
            bill: bill + "€"
        }
        this.toggle()
        this.props.createHistory(data, this.props.user._id)
        this.setState({
            code: "",
            count: 0,
            promoCode: "",
            codeCheck: false,
            message: "",
            duration: data.duration,
            bill: data.bill
        })
    }
    codeGenerateHandler = () => {
        let code = Math.floor(100000 + Math.random() * 900000)
        this.setState({
            code
        })
    }
    codeHandler = e => {
        this.setState({
            promoCode: e.target.value
        })
    }
    codeCheckerHandler = () => {
        if (this.state.code == this.state.promoCode) {
            this.setState({
                codeCheck: true,
                message: "code accepted successfully"
            })
        } else {
            this.setState({
                codeCheck: false,
                message: "invalid code"
            })
        }
    }
    secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

        var hDisplay = h < 10 ? "0" + h + ":" : h + ":";
        var mDisplay = m < 10 ? "0" + m + ":" : m + ":";
        var sDisplay = s < 10 ? "0" + s : s;
        return hDisplay + mDisplay + sDisplay;
    }
    render() {
        // if (!this.props.meta.place.address) {
        //     return (
        //         <Redirect to="/profile" />
        //     )
        // }
        let { lat, address, lng } = this.props.meta.place
        return (
            <section className="section-padding">
                <Container>
                    {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                    <MDBModal isOpen={this.state.modal} toggle={this.closeToggle}>
                        <MDBModalHeader toggle={this.closeToggle}>MDBModal title</MDBModalHeader>
                        <MDBModalBody>
                            <h4>Place : {this.props.meta.place.address}</h4>
                            <p>Duration: {this.state.duration}</p>
                            <p>Bill : {this.state.bill}</p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.closeToggle}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    <Card className="w-100">
                        <h4>{address}</h4>
                        <CardBody>
                            <GoogleMap lat={lat} lng={lng} />
                        </CardBody>
                    </Card>


                    <div className="code-generate-area section-padding">

                        <MDBBtn color="primary" outline onClick={this.codeGenerateHandler}>Get Promo Code</MDBBtn>

                        <div>
                            <h3>code: {this.state.code}</h3>
                        </div>
                    </div>
                    {this.state.message && (
                        <MDBAlert color={this.state.codeCheck ? "success" : "danger"}>{this.state.message}</MDBAlert>
                    )}
                    <div className="row code-submit-area">

                        <div className="col-md-6">
                            <div className="code-submit-area ">
                                <MDBInput label="Enter Promo code" name="promoCode" value={this.state.promoCode} onChange={this.codeHandler} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <MDBBtn color="success" disabled={!this.state.code} onClick={this.codeCheckerHandler}>submit</MDBBtn>

                        </div>
                    </div>
                    <div className="section-padding text-center">
                        {this.state.codeCheck && (
                            <div className='timer'>
                                <h1>{this.secondsToHms(this.state.count)}</h1>
                                <div>
                                    <MDBBtn color="primary" onClick={this.startTimer}>Start</MDBBtn>
                                    <MDBBtn color="danger" onClick={this.stopTimer} disabled={this.state.count === 0 ? true : false}>Stop</MDBBtn>
                                </div>
                            </div>
                        )}
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
    { createHistory }
)(GetCharge);
