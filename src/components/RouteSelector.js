import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';

class RouteSelector extends Component {

	render() {
		return (
			<div className="component-route-selector container fill-container">
				<GoogleMap />
			</div>
		);
	}

}

export default connect(
	null,
	null
)(RouteSelector);
