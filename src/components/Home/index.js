import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Legend from "../styled/Legend";
import Form from "../styled/Form";
import Fieldset from "../styled/Fieldset";
import Label from "../styled/Label";
import Input from "../styled/Input";
import Spacer from "../styled/Spacer";
import Notice from "../styled/Notice";
import Button from "../styled/Button";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			counter: 3
		};
	}

	handleChange = event => {
		this.setState({ value: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		if (!this.state.value && this.state.value === "95") {
			console.log("true");
		} else {
			this.setState({value: ""})
			this.setState(prevState => ({ counter: prevState.counter - 1 }));
		}
	};

	render() {
		if (this.state.counter === 0) {
			return <Redirect to="/login" />;
		}

		return (
			<div>
				<Spacer />
				<Notice>
					<p>You have {this.state.counter} attempts</p>
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
