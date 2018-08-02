/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROUTE_CALCULATION_COMPLETE, SET_ROUTE_SELECTOR_MAP } from '../actions/actions';
import promisifySetState from '../utils/promisifySetState';
import actionTypeWithPayload from '../utils/actionTypeWithPayload';

class GoogleMap extends Component {

	constructor(props) {
		super(props);

		this.setState = promisifySetState(this);

		this.state = {
			element: null
		};

		this._startMarker = null;
		this._endMarker = null;
		this._directionsService = null;
		this._directionsRenderer = null;
	}

	_calculateRoute() {
		if (!(this._directionsService))
			return;

		const origin = this._startMarker.getPosition();
		const destination = this._endMarker.getPosition();
		const request = this._createDirectionsRequest(origin, destination, 'WALKING');

		this._directionsService.route(request, (response, status) => this._onDirectionsServiceResponse(response, status));
	}

	_createDirectionsRenderer(map) {
		if (this._directionsRenderer)
			return;

		const renderer = new google.maps.DirectionsRenderer();
		renderer.setMap(map);
		renderer.setOptions({ 
			suppressMarkers: true 
		});

		return renderer;
	}

	_createDirectionsRequest(origin, destination, travelMode) {
		return { origin, destination, travelMode };
	}

	_createDirectionsService() {
		if (this._directionsService)
			return;

		return new google.maps.DirectionsService();
	}

	_createMap(element) {
		return new google.maps.Map(element, this._getMapOptions());
	}

	_createMarker(label, position) {
		return new google.maps.Marker({
			position,
			label,
			draggable: true,
			map: this.props.map
		});
	}

	_getMapOptions() {
		return {
			center: { lat: 0, lng: 0 },
			zoom: 3
		};
	}

	_getPathFromDirections(directions) {
		return directions.routes[0].overview_path;
	}

	_handleRouteCalculationRequest(prevProps) {
		if (prevProps.calculatingRoute === this.props.calculatingRoute)
			return;

		if (this.props.calculatingRoute) {
			this._calculateRoute();
		}
	}

	_onDirectionsServiceResponse(response, status) {
		if (status === 'OK') {
			this._renderDirections(response);
		} else {
			window.console.error(`DirectionsService response status: ${ status}`);
		}

		this.props.routeCalculationComplete();
	}

	_onMapMounted(element) {
		if (this.props.map || !(element))
			return;

		const map = this._createMap(element);

		this.props.setRouteSelectorMap(map);
		this._directionsService = this._createDirectionsService();
		this._directionsRenderer = this._createDirectionsRenderer(map);
	}

	_renderDirections(directions) {
		if (!(this._directionsRenderer))
			return;

		this._directionsRenderer.setDirections(directions);
	}

	_setBounds(prevProps) {
		if (!(this.props.map) || (prevProps.place === this.props.place))
			return;

		this.props.map.fitBounds(this.props.place.geometry.viewport);
	}

	_setMarkers(prevProps) {
		const { map } = this.props;

		if (!(map) || (prevProps.map === map))
			return;

		this._startMarker = this._createMarker("Start", map.getCenter());
		this._endMarker = this._createMarker("End", map.getCenter());
	}

	_setMarkersPosition(prevProps) {
		if (!(this.props.map) || !(this._startMarker) || !(this._endMarker) || (prevProps.place === this.props.place))
			return;

		this._startMarker.setPosition(this.props.map.getCenter());
		this._endMarker.setPosition(this.props.map.getCenter());
	}

	componentDidUpdate(prevProps) {
		this._setBounds(prevProps);
		this._setMarkers(prevProps);
		this._setMarkersPosition(prevProps);
		this._handleRouteCalculationRequest(prevProps);
	}

	render() {
		return (
			<div 
				className="component-google-map container fill-container"
				ref={ ref => this._onMapMounted(ref) } 
			>

			</div>
		);
	}

}

const mapStateToProps = function mapStateToProps(state) {
	return {
		calculatingRoute: state.calculatingRoute,
		place: state.routeSelectorPlace,
		map: state.routeSelectorMap
	};
}; 

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		routeCalculationComplete() {
			dispatch(actionTypeWithPayload(ROUTE_CALCULATION_COMPLETE));
		},
		
		setRouteSelectorMap(map) {
			dispatch(actionTypeWithPayload(SET_ROUTE_SELECTOR_MAP, map));
		}
	};
}; 


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GoogleMap);
