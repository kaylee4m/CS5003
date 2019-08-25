import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';


export default class App extends Component {
	render() {
		return(
			<BrowserRouter>
				<Dashboard />
			</BrowserRouter>
		)
	}
}