import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap';
import SearchBox from './SearchBox';
import CalculateRouteButton from './CalculateRouteButton';

class RouteSelector extends Component {

	render() {
		return (
			<div className="component-route-selector container fill-container">
				<GoogleMap />
				<SearchBox />
				<CalculateRouteButton />
			</div>
		);
	}

}

export default connect(
	null,
	null
)(RouteSelector);
