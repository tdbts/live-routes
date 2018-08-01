import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import actionTypeWithPayload from '../utils/actionTypeWithPayload';
import { ROUTE_CALCULATION_REQUEST } from '../actions/actions';

const CalculateRouteButton = props => (
	<Button 
		className="component-calculate-route-button"
		label="Calculate Route"
		onClick={ props.onClick }
	/>
);

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		requestRouteCalculation: () => dispatch(actionTypeWithPayload(ROUTE_CALCULATION_REQUEST))
	};
}; 

export default connect(null, mapDispatchToProps)(CalculateRouteButton);