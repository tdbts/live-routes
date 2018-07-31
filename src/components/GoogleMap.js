/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import promisifySetState from '../utils/promisifySetState';

class GoogleMap extends Component {

	constructor(props) {
		super(props);

		this.setState = promisifySetState(this);

		this.state = {
			element: null
		};

		this._map = null;
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
		if (this._map)
			return;

		this._map = this._createMap(element);
	}

	_setBounds(prevProps) {
		if (!(this._map) || (prevProps.bounds === this.props.bounds))
			return;

		this._map.fitBounds(this.props.bounds);
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
		bounds: state.routeSelectorBounds
	};
}; 

export default connect(
	mapStateToProps,
	null
)(GoogleMap);
