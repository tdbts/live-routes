/* global google, window */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_ROUTE_SELECTOR_PLACE } from '../actions/actions';
import promisifySetState from '../utils/promisifySetState';
import actionTypeWithPayload from '../utils/actionTypeWithPayload';

class SearchBox extends Component {

	constructor(props) {
		super(props);

		this.events = {
			PLACES_CHANGED: 'places_changed'
		};

		this.setState = promisifySetState(this);

		this.state = {
			value: ''
		};

		this._searchBox = null;
		this._autoComplete = null;
	}

	_addSearchBoxListeners(searchBox) {
		if (!(searchBox))
			return;

		searchBox.addListener(this.events.PLACES_CHANGED, () => this._onPlacesChanged());
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
		if (this._searchBox)
			return;

		this._searchBox = this._createSearchBox(element);
		this._addSearchBoxListeners(this._searchBox);

		this._autoComplete = this._createAutocomplete(element);
	}

	_onPlacesChanged() {
		if (!(this._searchBox))
			return;

		const [ place ] = this._searchBox.getPlaces();

		window.console.log("place:", place); 

		if (!(place))
			return;

		this.props.setRouteSelectorPlace(place);
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

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setRouteSelectorPlace(location) {
			dispatch(actionTypeWithPayload(SET_ROUTE_SELECTOR_PLACE, location));
		}
	};
}; 

export default connect(
	null,
	mapDispatchToProps
)(SearchBox);
