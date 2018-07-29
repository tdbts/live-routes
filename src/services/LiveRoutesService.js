import { GOOGLE_MAPS_API_URL, GOOGLE_MAPS_KEY } from '../constants/constants';

export default class LiveRoutesService {

	getGoogleMapsURL(key) {
		return `${ GOOGLE_MAPS_API_URL }?key=${ GOOGLE_MAPS_KEY }&libraries=drawing,geometry,places`;
	}

}
