import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import codepark from '../images/common/codepark.png';
import urls from './urls';

let BASE_URL = urls.API_URL;

class ForgotPass extends Component {
	state = {
		email: '',
		openSnackbar: false,
		msgSnackbar: '',
		respCode: '',
		loading: false
	}

	componentDidMount() {
		/**
		* Meta data is required for SEO
		* -----------------------------
		*/
	   let metaData = {
		   title : `Recover you CodePark Account | CodePark`,
		   description : `Forgot your password? Don't worry we got you covered. It's easy to recover your password here at CodePark, just enter your email Id and we will guide you. To login go to www.codeaprk.in/login`,
		   url : `https://codepark.in/forgotpass`,
		   keywords : `CodePark,coding,competitive programming,interview prepration,coding round prepration,coding events,forgot password`
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

	handleChange = prop => event => {
	    this.setState({ [prop]: event.target.value });
	};

	onClose = () => {
		this.setState({openSnackbar: false, loading: false});
		// if(this.state.respCode === 0) {
		// 	this.props.history.push('/');
		// 	// window.location.href="/dashboard";
		// }
	}

	postData = (e) => {
		e.preventDefault();
		this.setState({loading: true});
		let email = this.state.email;
		let data = {"email": email};
		data = JSON.stringify(data);
		axios.post(BASE_URL + '/forgotPassword', data, 
			{headers: {'Content-Type' : 'application/json'}})
		.then(function(response) {
			// console.log(response);
			let data = response.data;
			this.setState({openSnackbar: true, msgSnackbar: data.message,respCode: data.code, loading: false});
		}.bind(this))
		.catch(function(error) {
			console.log(error);
			this.setState({openSnackbar: true, 
				msgSnackbar: 'Could not complete your request. Please check your internet conection and try again'});
		}.bind(this))
	}

	render() {
		let vertical = 'top';
		let horizontal = 'center';
		return(
			<div className="signup">
		      <Paper className="login-form paper forgotPass-form" elevation={1}>
		      	<div className="login-logo">
		      		<NavLink to="/">
		      			<img src={codepark} alt="Codepark" className="signup-form-logo" /><br/><br/>
		      		</NavLink>
		      		<Typography variant="title">Account Recovery</Typography>
		      	</div><br/><br/>
		      	<Typography component="p" className="c-align f-bold">
		      		Enter your registered e-mail address
		      	</Typography><br/><br/>
			    <form className="signup-details" onSubmit={this.postData}>
				<div className="paper">
					<FormControl required className="signup-email login-item">
							{/* <TextField required id="email" label="Email" className="signup-email login-item" 
							margin="normal" onChange={this.handleChange('email')} /><br/> */}
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input id="email" type="email" value={this.state.email} 
							onChange={this.handleChange('email')}>
							</Input>
					</FormControl>
				</div><br className="hide-small"/><br/><br/>
				    <div className="center-vert center-hor">
					{!this.state.loading &&
				    		<Button type="submit" size="medium" 
				    		className="signup-form-btn text-trans pos-absolute">Next</Button>
				    	}
				    	{this.state.loading &&
				    		<div className="center-hor center-vert">
			    				<Button disabled={this.state.loading} type="submit" size="medium" 
			    				className="">Next</Button>
			    				<CircularProgress className="color-theme vertical-middle" size={32}/>
			    			</div>
			    		}
					</div>
				</form><br/><br/>
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

export default ForgotPass;