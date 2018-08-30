import React, { Component } from 'react';
import { connect } from 'react-redux';

const SeeRouteButton = props => props.directions ? <button className="component-see-route-button button">See Route</button> : null;

const mapStateToProps = function mapStateToProps(state) {
	return {
		directions: state.directions
	};
}; 

export default connect(
	mapStateToProps,
	null
)(SeeRouteButton);
