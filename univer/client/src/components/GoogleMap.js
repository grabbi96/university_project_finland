import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class GoogleMap extends Component {
    state = {}
    render() {
        const style = {
            width: '100%',
            height: '300px'
        }
        return (
            <div className="position-relative google-div">
                <Map
                    google={this.props.google}
                    initialCenter={{
                        lat: this.props.lat ? this.props.lat : 40.854885,
                        lng: this.props.lng ? this.props.lng : -88.081807
                    }}
                    zoom={14}
                    style={style}
                >

                    <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>google map</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>

        );
    }
}
export default GoogleApiWrapper(
    { apiKey: "AIzaSyC15OkDyDw78Zt8T-PfZHdEpjodipGG8FY" }
)(GoogleMap)