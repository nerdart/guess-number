import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginUser } from '../../services/dataService';
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
			username: "", 
			password: "",
			message: ""
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
		this.setState({message: ""})
		if (this.state.email !== "" && this.state.password !== "") {
			LoginUser(this.state).then((response) => {
				console.log(response)
				if(response.code) {
					this.setState({loginSuccess: true});
				} else {
					this.setState({message: response.message})
				}
    	});
		}
	}
	render() {
		const { loginSuccess, username, password } = this.state;
		
		if (loginSuccess) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Fieldset>
						<Legend>Sign In</Legend>
						<Label>Username</Label>
						<Input
							type="text"
							name="username"
							value={username}
							onChange={this.handleInputChange}
						/>
						<Label>Password</Label>
						<Input
							type="password"
							name="password"
							value={password}
							onChange={this.handleInputChange}
						/>
					</Fieldset>
					<p>{this.state.message}</p>
					<Button type="submit" >
						Sign in
					</Button>
				</Form>
			</div>
		);
	}
}
export default Login;
