import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import LiveRoute from './components/LiveRoute'
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<header>
					<Link to="/">Home</Link>
				</header>

				<main>
					<Route exact path="/" component={Home} />
					<Route exact path="/live-route" component={LiveRoute} />
				</main>
			</div>
		);
	}
}

export default App;
