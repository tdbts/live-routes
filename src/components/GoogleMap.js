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
	}

	_createMap(element) {
		return new google.maps.Map(element, this._getOptions());
	}

	_getOptions() {
		return {
			center: { lat: 0, lng: 0 }
			zoom: 3
		};
	}

	_onMapMounted() {

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

export default connect(
	null,
	null
)(GoogleMap);
