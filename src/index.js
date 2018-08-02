/* global window */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './App'
import './index.css'
import LiveRoutesService from './services/LiveRoutesService';
import injectScript from './utils/injectScript';
import actionTypeWithPayload from './utils/actionTypeWithPayload';
import { SET_SERVICE } from './actions/actions';

const service = new LiveRoutesService();
const target = document.querySelector('#root');

store.dispatch(actionTypeWithPayload(SET_SERVICE, service));

injectScript(service.getGoogleMapsURL())

	.then(() => render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App service={ service } />
			</ConnectedRouter>
		</Provider>,
		target
	))

	.catch(e => {
		window.console.error(e);
	});
