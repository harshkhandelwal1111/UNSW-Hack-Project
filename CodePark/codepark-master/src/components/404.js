import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

import './../styles/error.css';
import codepark from './../images/common/codepark.png';
import FooterBar from './common/footerBar';

class Error404 extends Component {
	render() {
		return (
			<div>
				<div className="c-navbar">
					<img src={codepark} alt="codepark" className="codepark-logo" />
				</div>
				<br /><br />
				<div className="error-content">
					<h1>404</h1>
					
					<p className="error-text">Codes are easier to find at CodePark. We couldn't find this page.</p>
					<p><a href="https://www.codepark.in">Go to codepark.in</a></p>
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
			<FooterBar/>
			</div>
		)
	}
}

export default Error404;
