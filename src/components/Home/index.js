import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Legend from "../styled/Legend";
import Form from "../styled/Form";
import Label from "../styled/Label";
import Input from "../styled/Input";
import Spacer from "../styled/Spacer";
import Notice from "../styled/Notice";
import Button from "../styled/Button";
import { ValidateUserUniqueId, getGuessCount } from '../../services/dataService';
import { getToken } from '../../services/localStorage';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			message: "",
			counter: 3
		};
	}

	componentDidMount() {
		const code = getToken()
		getGuessCount({code}).then(response => {
			this.setState({counter: response.code})
		})
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const code = getToken()
		const request = {
			code,
			uniqueId: this.state.value
		}
		
		ValidateUserUniqueId(request).then((response) => {
			console.log(response);
			if(response.status) {
				this.setState({
					counter: 3,
					message: response.message
				})
			}else if(!response.count) {
				this.setState({
					value: "",
					counter: 0
				})
			} else {
				this.setState({
					value: "",
					counter: response.count,
					message: ""
				})
			}
		})
	};

	render() {
		if (this.state.counter === 0) {
			return <Redirect to="/login" />;
		}

		return (
			<div>
				<Spacer />
				<Notice>
					{
						this.state.message ? 
						<p>{this.state.message}</p> :
						<p>You have {this.state.counter} attempts</p> 
					}
				</Notice>
				<Spacer />
				<Form onSubmit={this.handleSubmit}>
					<Legend>Enter a number between 10 to 100</Legend>
					<Spacer />
					<Label>
						Enter a Number:
						<Input
							type="text"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</Label>
					<Button type="submit">Submit</Button>
				</Form>
				
			</div>
		);
	}
}

export default Home;
