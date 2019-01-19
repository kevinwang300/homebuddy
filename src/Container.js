import React, { Component } from 'react';
import axios from 'axios';
import { GoogleApiWrapper } from 'google-maps-react';
import { Map } from './Map';

export class Container extends Component {
    componentDidMount() {
        console.log('mounting!');
        axios.get('/ping')
            .then(res => {
                console.log(res.data);
            })
    }

    buttonClicked() {
        console.log('I have been clicked!');
        axios.get('/test')
            .then(res => {
                console.log(res.data);
            })
    }

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        };

        console.log(this.props);

        return (
            <div style={style}>
                <Map google={this.props.google} />
                {/*<button type="button" onClick={this.buttonClicked}>Click Me!</button>*/}
                {/*<div>what is going on</div>*/}
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDfaCamdV4CSw1jBTG8NZeem0YG6kguM3s"
})(Container)