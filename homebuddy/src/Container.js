import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { Map } from './Map';

export class Container extends Component {
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        };

        console.log(this.props);

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