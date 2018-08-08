/* global google */

export default class LiveRoutesService {

	constructor() {
		this._directionsService = null;
		this._directionsRenderer = null;
	}
	
	_createDirectionsRenderer(map) {
		if (this._directionsRenderer)
			return;

		const renderer = new google.maps.DirectionsRenderer();
		
		renderer.setOptions({ 
			suppressMarkers: true 
		});

		return renderer;
	}

	_createDirectionsRequest(origin, destination, travelMode) {
		return { origin, destination, travelMode };
	}

	_createDirectionsService() {
		if (this._directionsService)
			return;

		return new google.maps.DirectionsService();
	}

	/*----------  Public API  ----------*/
	
	calculateRoute(origin, destination, travelMode) {
		const request = this._createDirectionsRequest(origin, destination, travelMode);

		return new Promise((resolve, reject) => {
			this._directionsService.route(request, (response, status) => {
				if (status === 'OK') {
					resolve(response);
				} else {
					reject(status);
				}
			});
		});
	}

	createMap(element, options) {
		return new google.maps.Map(element, options);
	}

	createMarker(label, position, options) {
		return new google.maps.Marker(options);
	}

	getGoogleMapsURL(key) {
		return `${ process.env.REACT_APP_GOOGLE_MAPS_API_URL }?key=${ process.env.REACT_APP_GOOGLE_MAPS_KEY }&libraries=drawing,geometry,places`;
	}

	registerMap(map) {
		this._directionsService = this._createDirectionsService();
		this._directionsRenderer = this._createDirectionsRenderer(map);		
		this._directionsRenderer.setMap(map);
	}

	renderDirections(directions) {
		this._directionsRenderer.setDirections(directions);
	} 

}
