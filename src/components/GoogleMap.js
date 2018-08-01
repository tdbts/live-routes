/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_ROUTE_SELECTOR_MAP } from '../actions/actions';
import promisifySetState from '../utils/promisifySetState';
import actionTypeWithPayload from '../utils/actionTypeWithPayload';

class GoogleMap extends Component {

	constructor(props) {
		super(props);

		this.setState = promisifySetState(this);

		this.state = {
			element: null
		};
	}

	_createMap(element) {
		return new google.maps.Map(element, this._getOptions());
	}

	_getOptions() {
		return {
			center: { lat: 0, lng: 0 },
			zoom: 3
		};
	}

	_onMapMounted(element) {
		if (this.props.map || !(element))
			return;

		this.props.setRouteSelectorMap(this._createMap(element));
	}

	_setBounds(prevProps) {
		if (!(this.props.map) || (prevProps.place === this.props.place))
			return;

		this.props.map.fitBounds(this.props.place.geometry.viewport);
	}

	componentDidUpdate(prevProps) {
		this._setBounds(prevProps);
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
		place: state.routeSelectorPlace,
		map: state.routeSelectorMap
	};
}; 

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setRouteSelectorMap(map) {
			dispatch(actionTypeWithPayload(SET_ROUTE_SELECTOR_MAP, map));
		}
	};
}; 


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GoogleMap);
