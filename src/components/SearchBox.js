/* global google */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import promisifySetState from '../utils/promisifySetState';

class SearchBox extends Component {

	constructor(props) {
		super(props);

		this.setState = promisifySetState(this);

		this.state = {
			value: ''
		};

		this._searchBox = null;
		this._autoComplete = null;
	}

	_createAutocomplete(element) {
		if (!(element) || this._autoComplete)
			return;

		return new google.maps.places.Autocomplete(element);
	}

	_createSearchBox(element) {
		if (!(element) || this._searchBox)
			return;

		return new google.maps.places.SearchBox(element);
	}

	_onChangeEvent(event) {
		this.setState({ value: event.target.value });
	}

	_onInputMounted(element) {
		this._searchBox = this._createSearchBox(element);
		this._autoComplete = this._createAutocomplete(element);
	}

	render() {
		return (
			<div className="component-search-box container">
				<input 
					className="fill-container" 
					type="text"
					ref={ ref => this._onInputMounted(ref) }
					value={ this.state.value }
					onChange={ event => this._onChangeEvent(event) } 
				/>
			</div>
		);
	}

}

export default connect(
	null,
	null
)(SearchBox);
