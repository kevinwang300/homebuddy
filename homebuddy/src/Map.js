import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Map extends Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;

        const directionsService = this.props && this.props.google ?
            new this.props.google.maps.DirectionsService() : null;

        const directionsDisplay = this.props && this.props.google ?
            new this.props.google.maps.DirectionsRenderer() : null;

        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            directionsService: directionsService,
            directionsDisplay: directionsDisplay
        }
    }

    componentDidMount() {
        // console.log(this.props.centerAroundCurrentLocation);
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            // let directionsService = new maps.DirectionsService();
            // let directionsDisplay = new maps.DirectionsRenderer();

            let haight = new maps.LatLng(37.7699298, -122.4469157);
            let oceanBeach = new maps.LatLng(37.7683909618184, -122.51089453697205);

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {initialCenter, zoom} = this.props;


            // let {lat, lng} = initialCenter;
            const {lat, lng} = this.state.currentLocation;

            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                // center: center,
                center: haight,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);
            this.state.directionsDisplay.setMap(this.map);
            this.calcRoute();


            // var directionsService = new google.maps.DirectionsService();
            // var directionsDisplay = new google.maps.DirectionsRenderer();
            // var haight = new google.maps.LatLng(37.7699298, -122.4469157);
            // var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
            // var mapOptions = {
            //     zoom: 14,
            //     center: haight
            // }
            // var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            // directionsDisplay.setMap(map);
        }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }

    calcRoute() {
        const google = this.props.google;
        const maps = google.maps;

        let haight = new maps.LatLng(37.7699298, -122.4469157);
        let oceanBeach = new maps.LatLng(37.7683909618184, -122.51089453697205);

        // let selectedMode = document.getElementById('mode').value;
        let request = {
            origin: haight,
            destination: oceanBeach,
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: maps.TravelMode['DRIVING']
        };

        console.log(this.state);

        this.state.directionsService.route(request, (response, status) => {
            console.log('response: ', response);
            console.log('status: ', status);
            if (status === 'OK') {
                this.state.directionsDisplay.setDirections(response);
            }
        });
    }

    render() {
        const mapStyle = {
            width: '70vw',
            height: '100vh',
            float: 'right'
        };

        const directionsPanelStyle = {
            width: '30vw',
            height: '100vh'
        };

        return (
            <div>
                <div ref='map' style={mapStyle}>
                    Loading map...
                </div>
                <div ref='directionsPanel' style={directionsPanelStyle}>
                    Loading directions panel...
                </div>
            </div>
        )
    }
}

Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    centerAroundCurrentLocation: PropTypes.bool
};

Map.defaultProps = {
    zoom: 13,
    // San Francisco, by default
    initialCenter: {
        lat: 37.774929,
        lng: -122.419416
    },
    centerAroundCurrentLocation: false
};
