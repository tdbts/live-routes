import React from 'react';

const noop = () => null;

export default props => (
	<button 
		className={ props.className }
		onClick={ props.onClick || noop }>
		{ props.label }
	</button>
);
