import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PrimarySearchAppBar from '../common/appbar';
import axios from 'axios';
import UserInfo from './userInfo';
import ShowFeed from './showFeed';
// import Feed from './feed';
import { NavLink } from 'react-router-dom';
import urls from './../urls';
import Cookie from './../cookie';
import userimg from './../../images/common/username.png';
import Snackbar from '@material-ui/core/Snackbar';
import FooterBar from '../common/footerBar';

// import Error404 from '../404';

let BASE_URL = urls.API_URL;

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			about: '',
			tags: [],
			notifmsg: '',
			notif: [],
			fName: '',
			level: 0,
			intelligence: 0,
			activeness: 0,
			helpfulness: 0,
			open: false,
			vertical: 'top',
			horizontal: 'center'
		}
		this.getUser();
	}

	handleClick = state => () => {
		this.setState({ open: true, ...state });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

  	getUser = () => {
  		let cookie = Cookie.getCookie('CP');
  		let config = {headers: {'Authorization': 'Bearer '+cookie}}
  		axios.get(BASE_URL + '/u/basic', config)
  		.then(function(response) {
  			let data = response.data;
  			if(data.code === 0) {
  				let user = data.userData;
				  // console.log('user',user);
				  document.title = user.name.fullName + ` | Dashboard`;
				  localStorage.setItem('username', user.username);
				  localStorage.setItem('userimg', user.profile_image);
				  localStorage.setItem('fullName', user.name.fullName);
				  this.setState({username: user.username, tags: user.topics, level: user.stats.level,
					fName: user.name.fullName, activeness: user.stats.activeness, helpfulness: user.stats.helpfulness,
					intelligence: user.stats.intelligence, image: user.profile_image,about: user.about});
				this.setState({
					open:true
				})
				setTimeout(() => {
					this.setState({
						open:false
					})
				}, 3000);
  			}
  		}.bind(this))
  		.catch(function(error) {
  			console.log(error);
  		})
  	}
	render() {
		const { vertical, horizontal, open, image, username } = this.state;
		return(
			<div className="bg-grey">
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					variant="success"
					message="Here is your dashboard !"
				/>
				<PrimarySearchAppBar history = {this.props.history}/><br></br>
				<Grid container spacing={24} className="dashboard">
					<Grid item lg={3} md={3} className="hide-smr">
						<UserInfo username={this.state.username} tags={this.state.tags} level={this.state.level}
						fName={this.state.fName} activeness={this.state.activeness} helpfulness={this.state.helpfulness}
						intelligence={this.state.intelligence} image={this.state.image} about={this.state.about} />
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12} className="no_pad_in_mobile">
						<Paper className="paper no_margin_in_mobile" elevation={1}>
						<NavLink to = {`/user/${username}`} className="text-decor">
							<div className="center-vert">
								<Avatar alt={this.state.username} 
								src={image?image:userimg}
								className="user-avatar-sm mright-half" />
								<Typography component="p" className="color-grey">{this.state.fName}</Typography>
							</div><br/>
						</NavLink>
							<NavLink to="/question" className="navlink">
								<Typography variant="headline" component="h3" className="f-bold color-grey">
								Add your question
								</Typography>
							</NavLink>
						</Paper><br/>
						<ShowFeed history={this.props.history}/>
						<FooterBar/>
					</Grid>
				</Grid>
			</div>
			)
	}
}
export default Dashboard;
