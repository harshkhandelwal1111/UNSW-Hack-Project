import React, { Component } from 'react';
import PrimarySearchAppBar from '../common/appbar';
import MainAppbar from '../common/mainAppbar';
import Cookie from '../cookie';

class Navbar extends Component {
	render() {
		// console.log(Cookie.getCookie('CP'))
		return(
			<div>
			{Cookie.getCookie('CP') && 
			<PrimarySearchAppBar/>} 
			{!Cookie.getCookie('CP') &&
			<MainAppbar />}
			</div>
		);
	}
}

export default Navbar;