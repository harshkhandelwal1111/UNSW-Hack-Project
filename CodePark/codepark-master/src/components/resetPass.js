import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
// import asyncValidate from './asyncValidate'
import axios from 'axios';
import codepark from '../images/common/codepark.png';
import urls from './urls';
import CircularProgress from '@material-ui/core/CircularProgress';
import {NavLink} from 'react-router-dom';

let BASE_URL = urls.API_URL;

class ResetPass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
			showPassword: false,
			loading: false,
			respCode: 1
		}
	}
	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Reset Password | CodePark`,
			description : `Easily reset your account password. To login go to www.codeaprk.in/login`,
			url : `https://codepark.in/resetpass`,
			keywords : `CodePark,coding,competitive programming,interview prepration,coding round prepration,coding events`
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

	onClose = () => {
		this.setState({openSnackbar: false});
		// if(this.state.respCode === 0) {
		// 	this.props.history.push('/');
		// 	// window.location.href="/dashboard";
		// }
	}


	sendData = (e) => {
		e.preventDefault();
		this.setState({loading: true});
		let password = this.state.password;
		let confirmPassword = this.state.confirmPassword;
		let token = this.props.match.params.token;
		let data = {"password": password,"confirmPassword": confirmPassword};
		data = JSON.stringify(data);
		let config = {
			headers: {'Content-Type' : 'application/json'}
		}
		// if(!!password && !!confirmPassword && password===confirmPassword) {
		axios.post(BASE_URL + `/resetPassword/${token}`, data, config)
		.then(function(response){
			let data = response.data;
			// console.log(response);
			this.setState({openSnackbar: true, msgSnackbar: data.message, respCode: data.code, loading: false});
		}.bind(this))
		.catch(function(error) {
			console.log(error);
			this.setState({openSnackbar: true, 
				msgSnackbar: 'Could not complete your request. Please check your internet conection and try again'})
		}.bind(this));
	}

	handleChange = prop => event => {
	    this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
	    this.setState(state => ({ showPassword: !state.showPassword }));
	};


	componentDidMount() {
    	document.title = "Reset Password | CodePark"
  	}

	render() {
		let vertical = 'top';
		let horizontal = 'center';
		return(
			<div className="signup">
		      <Paper className="signup-form" elevation={1}>
		      	<div className="login-logo">
		      		<img src={codepark} alt="Codepark" className="signup-form-logo" /><br/><br/>
		      		<Typography variant="title">Reset your password</Typography>
		      	</div><br/><br/>
			    <form className="signup-details" onSubmit={this.sendData}>
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
				    </FormControl><br/><br/>
				    <FormControl className="login-pass login-item login-name">
				        <InputLabel htmlFor="adornment-password">Confirm Password</InputLabel>
				        <Input id="adornment-password" type={this.state.showPassword ? 'text' : 'password'}
				            value={this.state.confirmPassword}
				            onChange={this.handleChange('confirmPassword')}
				        />
				    </FormControl><br/><br/><br/><br/><br/><br/><br/><br/><br/>
					<div className="r-align mright-three">
					{!this.state.loading &&
						this.state.respCode ===0 && 
							<div className="space-between">
								<NavLink to="/login" className="navlink-text">Back to Login</NavLink>
								<Button type="submit" size="medium" 
								className="signup-form-btn text-trans pos-absolute">Next</Button>
							</div>
						}
						{!this.state.loading && this.state.respCode!==0 && 
						<Button type="submit" size="medium" 
						className="signup-form-btn text-trans pos-absolute">Next</Button>
						}		
				    	{this.state.loading &&
				    		<div className="">
			    				<Button disabled={this.state.loading} type="submit" size="medium" 
			    				className="">Next</Button>
			    				<CircularProgress className="color-theme vertical-middle" size={32}/>
			    			</div>
			    		}
				    </div>
				</form>
			  </Paper>
			  <Snackbar
			  	  anchorOrigin={{ vertical, horizontal }}
		          open={this.state.openSnackbar}
		          message={this.state.msgSnackbar}
		          onClose={this.onClose}
		          // onRequestClose={() => {
		          //   this.setState({ openSnackbar: false });
		          // }}
		        />
			</div>
		);
	}	
}

export default ResetPass;