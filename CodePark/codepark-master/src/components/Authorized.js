import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import * as qs from 'query-string';
import urls from './urls';

import './../styles/error.css';
import codepark from './../images/common/codepark.png';

let BASE_URL = urls.API_URL;

class Authorized extends Component {
    state = {
        message: ''
    }

    componentDidMount(){
        let data = qs.parse(this.props.location.search);

        axios.post(BASE_URL+`/auth/verifyMail`, data)
            .then((response) => {
                this.setState({ message: response.data.message });
            })
            .catch((error) => {
               
            })
    }

	render() {
		return (
			<div>
				<div className="c-navbar">
					<img src={codepark} alt="codepark" className="codepark-logo" />
				</div>
				<br /><br />
				<div className="error-content">
					<h1>{this.state.message}</h1>
					
					{/* <p className="error-text">You have been Authorized</p> */}
					<p><a href="http://codepark.in/login">Let's get you to CodePark</a></p>
				</div>
				<br></br>
				<Typography variant="title" component="h1" className="c-align">
						Keep In Touch
				</Typography><br/>
				<div className="social-icons">
					<SocialIcon url="https://www.facebook.com/codepark.in" className="social-icon"/>
					<SocialIcon url="https://www.twitter.com/CodePark_in" className="social-icon"/>
					<SocialIcon url="https://www.linkedin.com/company/codepark-in" className="social-icon"/>
					<SocialIcon url="https://www.instagram.com/CodePark_in" className="social-icon"/>
				</div>
				<br />
			<AppBar position="static" className="error-footer">
		        {/* <Toolbar className="footer-menu">
				</Toolbar><br/> */}
					<Typography component="p" className="copyright">&copy;2017 - 2018 CodePark. All rights Reserved
					</Typography>
			</AppBar>	
			</div>
		)
	}
}

export default Authorized;
