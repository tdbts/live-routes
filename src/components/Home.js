import React from 'react';
import { connect } from 'react-redux';
import RouteSelector from './RouteSelector';

const Home = props => (
	<div className={ "component-home container fill-container" }>
		<RouteSelector />
  	</div>
);

export default connect(
	null, 
	null
)(Home);
