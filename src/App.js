import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="component-app container fill-container">
				<header>
					<Link to="/">Home</Link>
				</header>

				<main>
					<Route exact path="/" component={ Home } />
				</main>
			</div>
		);
	}
}

export default App;
