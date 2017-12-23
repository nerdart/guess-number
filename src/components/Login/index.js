import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../services/auth";
import Form from "../styled/Form";
import Fieldset from "../styled/Fieldset";
import Legend from "../styled/Legend";
import Label from "../styled/Label";
import Input from "../styled/Input";
import Button from "../styled/Button";

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
				<Form onSubmit={this.handleSubmit}>
					<Fieldset>
						<Legend>Sign In</Legend>
						<Label>Email</Label>
						<Input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.handleInputChange}
						/>
						<Label>Password</Label>
						<Input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleInputChange}
						/>
					</Fieldset>
					<Button type="submit" >
						Sign in
					</Button>
				</Form>
			</div>
		);
	}
}
export default Login;
