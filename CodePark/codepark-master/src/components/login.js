import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
// import asyncValidate from './asyncValidate'
// import CustomSnackbar from './common/customSnackbar';
import Snackbar from '@material-ui/core/Snackbar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import codepark from '../images/common/codepark.png';
import urls from './urls';
import Cookie from './cookie';

let BASE_URL = urls.API_URL;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showPassword: false,
			openSnackbar: false,
			typeSnackbar:'',
			msgSnackbar:'',
			loading: false
		}
	}

	sendData = (e) => {
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		let data = { "email": email, "password": password };
		data = JSON.stringify(data);
		this.setState({loading: true});
		let type,msg;
		axios.post(BASE_URL + '/auth/verifyUser', data, {headers: {'Content-Type' : 'application/json'}})
		.then(function(response){
			let data = response.data;
			msg = data.message;
			if(data.code === 0) {
				const {name:{firstName, fullName}, username, profile_image} = data.userData;
				localStorage.setItem('firstName', firstName);
				localStorage.setItem('fullName', fullName);
				localStorage.setItem('username', username);
				localStorage.setItem('userimg',profile_image);
				type = 'success';
				let cookie = response.data.cookies.CP;
				Cookie.setCookie('CP',cookie);
				this.setState({openSnackbar: true, typeSnackbar: type, msgSnackbar: msg, firstLogin: response.data.firstLogin});
			}
			else {
				type = 'error';
				this.setState({openSnackbar: true, typeSnackbar: type, msgSnackbar: msg})
			}
		}.bind(this))
		.catch(function(error) {
			console.log(error);
			type='error';
			msg='Could not login. Please refresh and try again';
			// console.log(type,msg);
			this.setState({openSnackbar: true, typeSnackbar: type, msgSnackbar: msg})
		}.bind(this));
		// this.setState({loading: false});
	}

	handleChange = prop => event => {
	    this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
	    this.setState(state => ({ showPassword: !state.showPassword }));
	};

	onClose = () => {
        this.setState({openSnackbar: false, loading: false});
        let route;
		if(Cookie.getCookie('CP')) {
            // this.props.history.push('/dashboard');
            if(this.state.firstLogin)
                route = "/firstLogin";
			else{
				if(localStorage.getItem('about_to_register')){
					route = `/events/${localStorage.getItem('about_to_register')}`
				}
				else if(localStorage.getItem('path')) {
					route = localStorage.getItem('path');
				}
				else{
					route = "/dashboard";
				}
			}
			window.location.href = route;
			// this.props.history.push(route);
		}
	}


	componentDidMount() {
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Login to your CodePark Account | CodePark`,
			description : `CodePark is where you meet the best people in programming. Login to know more`,
			url : `https://codepark.in/login`,
			keywords : `login,codepark,codepark.in,competitive programming,interview preparation,interview questions`
			}
			document.title = metaData.title;
			document.querySelector('meta[name="title"]').setAttribute("content", metaData.title);
			document.querySelector('meta[name="description"]').setAttribute("content", metaData.description);
			document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
			document.querySelector('meta[itemprop="keywords"]').setAttribute("content", metaData.keywords);
			document.querySelector('meta[property="og:title"]').setAttribute("content", metaData.title);
			document.querySelector('meta[property="og:description"]').setAttribute("content", metaData.description);
			document.querySelector('meta[property="og:url"]').setAttribute("content", metaData.url);
			document.querySelector('meta[name="twitter:title"]').setAttribute("content", metaData.title);
			document.querySelector('meta[name="twitter:description"]').setAttribute("content", metaData.description);
			/**
			 * --------------------------------
			 */
  	}

	render() {
		let vertical = 'top';
		let horizontal = 'center';
		return(
			<div className="signup">
		      <Paper className="login-form" elevation={1}>
		      	<div className="login-logo">
		      		<NavLink to="/">
		      			<img src={codepark} alt="CodePark" className="signup-form-logo" />
		      		</NavLink><br/><br/>
		      		<Typography variant="title">Login</Typography>
		      	</div><br/><br/>
			    <form className="signup-details form" onSubmit={this.sendData}>
				    <TextField required id="standard-required" label="Email" className="login-item login-pass login-name" 
				    margin="normal" onChange={this.handleChange('email')} /><br/>
				    <FormControl className="login-pass login-item login-name">
				        <InputLabel htmlFor="adornment-password">Password</InputLabel>
				        <Input id="adornment-password" type={this.state.showPassword ? 'text' : 'password'}
				            value={this.state.password}
				            onChange={this.handleChange('password')}
				            endAdornment={
				              <InputAdornment position="end">
				                <IconButton aria-label="Toggle password visibility"
				                  onClick={this.handleClickShowPassword} >
				                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
				                </IconButton>
				              </InputAdornment>
				            }
				        />
				    </FormControl><br/><br/><br/><br/>
				    <div className="left-align">
				    	<NavLink to="/forgotpass" className="navlink">
				    		<Typography className="text-trans color-theme f-bold btn-padding">Forgot Password ?</Typography>
				    	</NavLink>
				    </div><br/>
				    <div className="signup-btn-div">
				    	<NavLink to="/signup" className="navlink">
				    		<Button className="text-trans color-theme f-bold">Create account</Button>
				    	</NavLink>
				    	{!this.state.loading &&
				    		<Button type="submit" size="medium" 
				    		className="signup-form-btn text-trans pos-absolute">Login</Button>
				    	}
				    	{this.state.loading &&
				    		<div className="center-vert">
			    				<Button disabled={this.state.loading} type="submit" size="medium" 
			    				className="pos-absolute text-trans">Login</Button>
			    				<CircularProgress className="color-theme" size={32}/>
			    			</div>
			    		}
				    </div>
				</form>
			  </Paper>
			  	<Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
		          open={this.state.openSnackbar}
		          message={this.state.msgSnackbar}
		          autoHideDuration={4000}
		          onClose={this.onClose}
		          // onRequestClose={() => {
		          //   this.setState({ openSnackbar: false });
		          // }}
		        />
			</div>
		);
	}	
}

export default Login;