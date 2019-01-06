import React, { Component } from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';

export class Container extends Component {
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        };

        return (
            <div style={style}>
                <Map google={this.props.google} />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDfaCamdV4CSw1jBTG8NZeem0YG6kguM3s"
})(Container)