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
	}

	_calculateRoute() {
		const origin = this._startMarker.getPosition();
		const destination = this._endMarker.getPosition();
		
		this.props.service.calculateRoute(origin, destination, 'WALKING')
			.then(directions => this.props.service.renderDirections(directions))
			.catch(status => window.console.error(`DirectionsService response status: ${ status }`));
	}

	_createMarker(label, position) {
		return this.props.service.createMarker(label, position, {
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

		const map = this.props.service.createMap(element, this._getMapOptions());

		this.props.setRouteSelectorMap(map);
		this.props.service.registerMap(map);
	}

	_setBounds(prevProps) {
		const { map, place } = this.props;

		if (!(map) || (prevProps.place === place))
			return;
		
		if (place && place.geometry && place.geometry.viewport)
			map.fitBounds(place.geometry.viewport);
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
		map: state.routeSelectorMap,
		place: state.routeSelectorPlace,
		service: state.service
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
