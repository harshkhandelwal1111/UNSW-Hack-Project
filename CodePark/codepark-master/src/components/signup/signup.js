import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ReCaptcha } from 'react-recaptcha-google';
import urls from './../urls';
import codepark from '../../images/common/codepark.png';

let BASE_URL = urls.API_URL;

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			confirmPassword: '',
			refcode: '',
			showPassword: false,
			showConfirmPassword: false,
			openSnackbar: false,
			msgSnackbar: '',
			respCode: '',
			recaptchaToken: '',
			loading: false
		}
	}


	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	recaptchaChange = value => {
		// console.log('reCaptcha mounted');
		this.setState({ reCaptcha: value });
	}

	onClose = () => {
		this.setState({ openSnackbar: false, loading: false });
	}

	postData = (e) => {
        e.preventDefault();
        this.setState({loading:true});
		let firstname = this.state.firstname;
		let lastname = this.state.lastname;
		let email = this.state.email;
		let password = this.state.password;
		let confirmPassword = this.state.confirmPassword;
		let refcode = this.state.refcode;
		let recaptchaToken = this.state.recaptchaToken;
		let data = {
			"email": email, "password": password, "cpassword": confirmPassword,
			"firstName": firstname, "lastName": lastname, "referral": refcode,"googleCaptcha":recaptchaToken
		};
		data = JSON.stringify(data);
		let config = {
			headers: { 'Content-Type': 'application/json' },
		}
		axios.post(BASE_URL + '/auth/save', data, config)
			.then(function (response) {
				let data = response.data;
                this.setState({ openSnackbar: true, msgSnackbar: data.message, 
                    respCode: data.code, loading:false });
			}.bind(this))
			.catch(function (error) {
				this.setState({
					openSnackbar: true,
                    msgSnackbar: 'Could not Signup. Please check your internet conection and try again',
                    loading: false
				});
			}.bind(this));
	}

	onLoadRecaptcha = () => {
		if (this.captchaDemo) {
			this.captchaDemo.reset();
		}
	}
	verifyCallback = (recaptchaToken) => {
		// Here you will get the final recaptchaToken!!!  
		// console.log(recaptchaToken, "<= your recaptcha token")
		this.setState({ recaptchaToken });
	}

	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Get your CodePark Account | CodePark`,
			description : `CodePark is where you meet the best people in programming. One of the first social programming community in the world. Come join us, revolutionize how you learn to code!`,
			url : `https://codepark.in/signup`,
			keywords : `signup,register,codepark,codepark.in,competitive programming,interview preparation,interview questions`
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
		if (this.captchaDemo) {
			// console.log("launching, just a moment...")
			this.captchaDemo.reset();
		}
	}

	render() {
		let vertical = 'top';
		let horizontal = 'center';
		return (
			<div className="signup">
				<Paper className="signup-form" elevation={1}>
					<div className="signup-form-logo-div ">
						<NavLink to="/">
							<img src={codepark} alt="Codepark" className="signup-form-logo" />
						</NavLink>
					</div><br />
					<Typography variant="title">
						Create your CodePark Account
                  </Typography>
					<form className="signup-details" onSubmit={this.postData}>
						<div className="signup-flexbox">
							<TextField required id="firstname" label="First Name"
								className="login-name login-item signup-pass" margin="normal" onChange={this.handleChange('firstname')} /><br />
							<TextField required id="lastname" label="Last Name"
								className="login-name login-item signup-pass" margin="normal" onChange={this.handleChange('lastname')} /><br />
						</div><br className="hide-small" />
						<FormControl className="signup-email login-item">
							{/* <TextField required id="email" label="Email" className="signup-email login-item" 
                        margin="normal" onChange={this.handleChange('email')} /><br/> */}
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input id="email" type="email" value={this.state.email}
								onChange={this.handleChange('email')}>
							</Input>
						</FormControl><br className="hide-small" />
						<br className="hide-small" />
						<div className="signup-flexbox">
							<FormControl className="signup-pass login-item">
								<InputLabel htmlFor="adornment-password">Password</InputLabel>
								<Input
									id="adornment-password"
									type={this.state.showPassword ? 'text' : 'password'}
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
							</FormControl><br /><br />
							<FormControl className="signup-pass login-item">
								<InputLabel htmlFor="adornment-confirmPassword">Confirm Password</InputLabel>
								<Input
									id="adornment-confirmPassword"
									type={this.state.showPassword ? 'text' : 'password'}
									value={this.state.confirmPassword}
									onChange={this.handleChange('confirmPassword')}
								/>
							</FormControl>
						</div><br className="hide-small" />
						<TextField label="Enter Referral Code (Optional)" className="signup-email login-item"
							margin="normal" onChange={this.handleChange('refcode')} /><br
							className="hide-small" /><br className="hide-small" />
						<br />
						<div>
							<ReCaptcha
								ref={(el) => { this.captchaDemo = el; }}
								size="normal"
								data-theme="dark"
								render="explicit"
								sitekey="6LdWZVoUAAAAAP6KbKjnhLe5bBJhzhbZvSH0GETd"
								onloadCallback={this.onLoadRecaptcha}
								verifyCallback={this.verifyCallback}
							/>
							<br />
						</div>
						<Typography component="p" className="left-align">
							By signing up you agree with our
                          <NavLink to="/privacy" className="navlink-text"> privacy policy
                          </NavLink> and <NavLink to="/terms" className="navlink-text">terms of service.</NavLink>
						</Typography><br /><br />
						<div className="signup-btn-div">
							<NavLink to="/login" className="navlink">
								<Button className="text-trans color-theme f-bold">Sign in instead</Button>
							</NavLink>
							{!this.state.loading &&
				    		<Button type="submit" size="medium" 
				    		className="signup-form-btn text-trans pos-absolute">Sign Up</Button>
                            }
                            {this.state.loading &&
                                <div className="center-vert">
                                    <Button disabled={this.state.loading} type="submit" size="medium" 
                                    className="pos-absolute text-trans">Sign Up</Button>
                                    <CircularProgress className="color-theme" size={32}/>
                                </div>
                            }
						</div>
					</form>
				</Paper><br />
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={this.state.openSnackbar}
					message={this.state.msgSnackbar}
					onClose={this.onClose}
				/>
			</div>
		);
	}
}

export default SignUp;