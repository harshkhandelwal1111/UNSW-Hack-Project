import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import codepark from '../../images/common/codepark.png';
import codeparkSmall from '../../images/common/icons-192.png';

class MainAppbar extends Component {
	go_to_events = () => {
		window.location.href = "/events"
	}
	
	render() {
		return (
	      <AppBar position="static" className="navbar">
	        <Toolbar className="main-appbar">
	        <Grid container>
	        	<Grid item lg={3} md={3} sm={3} xs={2}>
	        		<NavLink to="/">
				        <Typography variant="title" color="inherit" className="">
				        	<img src={codepark} alt="Codepark" className="brand-img hide-small" />
				        	<img src={codeparkSmall} alt="Codepark" className="brand-img hide-big" />
				        </Typography>
				    </NavLink>
			    </Grid>
			    <Grid item lg={5} md={4} sm={2} xs={false}></Grid>
				<Grid item lg={4} md={5} sm={7} xs={10} className="login-signup">
				  <Button onClick={this.go_to_events} className="outline-login-btn mright-one" variant="outlined">EVENTS</Button>
		          <NavLink to="/signup" className="navlink mright-one">
				  	<Button className="login-btn">Sign Up</Button>
				  </NavLink>
				  <NavLink to="/login" className="navlink">
				  	<Button className="outline-login-btn">Login</Button>
				  </NavLink>
				</Grid>
			</Grid>
	        </Toolbar>
	      </AppBar>
		);
	}
}

export default MainAppbar;