import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
	render() {
		let d=new Date().getFullYear()
		return (
			<AppBar position="static" className="footer">
		        <Toolbar className="footer-menu">
		        	<NavLink to="/about" className="navlink">
						<Button className="text-trans f-bold">About Us</Button>
					</NavLink>
					<NavLink to="/tendays" className="navlink">
						<Button className="text-trans f-bold">10 Days of Code </Button>
					</NavLink>
					<NavLink to="/contact" className="navlink">
						<Button className="text-trans f-bold">Contact</Button>
					</NavLink>
					<NavLink to="/terms" className="navlink">
						<Button className="text-trans f-bold">Terms of Service</Button>
					</NavLink>
					<NavLink to="/privacy" className="navlink">
						<Button className="text-trans f-bold">Privacy Policy</Button>
					</NavLink>
				</Toolbar><br/>
				<Typography component="p" className="copyright">&copy;2017 - {d} CodePark. All rights Reserved
				</Typography>
			</AppBar>			
		);
	}
}

export default Footer;