import React, { Component } from "react";
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoutes';
import LoginPage from "./routes/login";
import HomePage from "./routes/home";

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<div className="App-Content">
						<PrivateRoute exact path="/" component={HomePage} />
						<Route exact path="/login" component={LoginPage} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
