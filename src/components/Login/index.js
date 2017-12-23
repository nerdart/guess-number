import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../services/auth";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			email: "", 
			password: "", 
			loginSuccess: false 
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInputChange(event) {
		const target = event.target;
		const name = target.name;

		this.setState({
			[name]: target.value
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.email !== "" && this.state.password !== "") {
			Auth.authenticate(() => {
				this.setState({ loginSuccess: true });
			});
		}
	}
	render() {
		const { loginSuccess } = this.state;
		if (loginSuccess) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Email</label>
					<input
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleInputChange}
					/>
					<br />
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleInputChange}
					/>
					<br />
					<input type="submit" value="Sign in" />
				</form>
			</div>
		);
	}
}
export default Login;
