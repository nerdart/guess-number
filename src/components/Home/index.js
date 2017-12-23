import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
    super(props);
    this.state = {
			value: '',
			counter: 3
		};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) =>{
		event.preventDefault();		
		this.setState(prevState => ({counter: prevState.counter - 1 }))
	}
	
	render() { 

		if(this.state.counter === 0) {
			return <Redirect to="/login" />
		}

		return ( 
			<div>
				<h1>Home Page</h1>
				<label>Enter a number between 10 to 100</label>
				<br />
				<label>You have {this.state.counter} attempts</label>

				<form onSubmit={this.handleSubmit}>
					<label>
						Enter a Number: 
						<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>

			</div>
		)
	}
}
 
export default Home;