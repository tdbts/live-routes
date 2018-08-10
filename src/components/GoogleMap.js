import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROUTE_CALCULATION_COMPLETE, SET_DIRECTIONS, SET_ROUTE_SELECTOR_MAP } from '../actions/actions';
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
		const { service, setDirections, routeCalculationComplete } = this.props;
		const origin = this._startMarker.getPosition();
		const destination = this._endMarker.getPosition();
		
		service.calculateRoute(origin, destination, 'WALKING')
			.then(setDirections)
			.then(routeCalculationComplete)
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

	_onDirectionsUpdate(prevProps) {
		const { directions } = this.props;

		if (directions === prevProps.directions)
			return;

		this._renderDirections(directions);
	}

	_onMapMounted(element) {
		if (this.props.map || !(element))
			return;

		const map = this.props.service.createMap(element, this._getMapOptions());

		this.props.setRouteSelectorMap(map);
		this.props.service.registerMap(map);
	}

	_onRouteCalculationRequest(prevProps) {
		if (prevProps.calculatingRoute === this.props.calculatingRoute)
			return;

		if (this.props.calculatingRoute) {
			this._calculateRoute();
		}
	}

	_renderDirections(directions) {
		if (!(directions))
			return;

		this.props.service.renderDirections(directions);
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
		this._onRouteCalculationRequest(prevProps);
		this._onDirectionsUpdate(prevProps);
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
		directions: state.directions,
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
		
		setDirections(route) {
			dispatch(actionTypeWithPayload(SET_DIRECTIONS, route));
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
