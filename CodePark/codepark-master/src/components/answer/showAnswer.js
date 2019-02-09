import React, { Component } from 'react';
import axios from 'axios';
import Answer from './answer';
import urls from '../urls';
import Cookie from '../cookie';

let BASE_URL = urls.API_URL;

class ShowAnswer extends Component {
	constructor() {
		super();
		this.state = {
			question: [],
		}
		this.getData();
	}
	getData = () => {
		let cookie = Cookie.getCookie('CP');
		let config = {
        headers : {'Content-Type' : 'application/json','Authorization':'Bearer '+cookie},
      }
		axios.get(BASE_URL + '/content/questions/details/RWwVSEuD3X',config)
		.then(function(response) {
			if(response.data.code === 0) {
				this.setState({question: response.data})
				// console.log(response);
			}			
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		});
	}
	render() {
		return(
			<div>
				<Answer />
			</div>
		);
	}
}

export default ShowAnswer;