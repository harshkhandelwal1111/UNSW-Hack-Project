import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Snackbar} from '@material-ui/core';
import moment from 'moment';
import { NavLink, withRouter } from 'react-router-dom';
import userimg from './../../images/common/username.png'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Check from '@material-ui/icons/Check'
import RssFeed from '@material-ui/icons/RssFeed'
import axios from 'axios';
import Cookie from '../cookie';
import urls from './../urls';

let BASE_URL = urls.API_URL;

class QuesInfo extends Component {
	state = {
		is_following: this.props.user_follows,
		no_fol: this.props.no_of_followers,
		openSnackbar: false,
		msgSnackbar: '',
		vertical: 'top',
		horizontal: 'center'
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			is_following: nextProps.user_follows,
			no_fol: nextProps.no_of_followers
		})
		// console.log(nextProps);
	}
	componentDidMount() {
		this.setState({
			is_following: this.props.user_follows,
			no_fol: this.props.no_of_followers
		});
		// console.log(this.props);
	}

	onClose = () => {
		this.setState({openSnackbar: false});
	}

	follow_from_qview = (uid) => {
		return () => {
			let cookie = Cookie.getCookie('CP');
			axios.post(BASE_URL + `/u/follow/${uid}`, {}, {
				headers: {
					Authorization: "Bearer " + cookie
				}
			});
			if(!cookie) {
				this.setState({
					openSnackbar: true,
					msgSnackbar: 'You are not logged in!! Please login to continue.'
				})
			}
			else {
				if (this.state.is_following) {
					this.setState({
						no_fol: this.state.no_fol - 1,
						is_following: !this.state.is_following
					})
				}
				else {
					this.setState({
						no_fol: this.state.no_fol + 1,
						is_following: !this.state.is_following
					})
				}
			}
		}
	}

	render() {
		const {vertical, horizontal} = this.state;
		let cookie=Cookie.getCookie('CP');
		// let date = this.props.date;
		// console.log('date',date);
		// console.log(this.props.image)
		return (
			<Paper className="paper c-align ques-info">
				<NavLink to={cookie? `/user/${this.props.askedBy}`: this.props.location.pathname} className="text-decor">
					<Avatar alt="Username"
						src={this.props.image ? this.props.image : userimg}
						className="user-avatar-lg margin-auto" />
				</NavLink><br />
				<div className="center-vert center-hor">
					<NavLink to={ cookie? `/user/${this.props.askedBy}`: this.props.location.pathname} className="text-decor">
						<Typography variant="headline" component="h1" className="f-bold">
							{this.props.askedBy}
						</Typography>
					</NavLink>
				</div>

				<Typography component="p" className="little_up only_grey text_bold_600">{this.props.about}</Typography><br></br>
				{this.state.is_following !== '' && <div>
					{this.props.askedBy !== localStorage.getItem('username') && !this.state.is_following &&
						<Chip
							onClick={this.follow_from_qview(this.props.userId)}
							avatar={<Avatar className="following_button_color">{this.state.no_fol}</Avatar>}
							label="Follow"
							className="qview_follow_btn"
							variant="outlined"
							onDelete={() => { }}
							deleteIcon={<RssFeed className="only_theme_color" />} />
						|| this.props.askedBy !== localStorage.getItem('username') &&
						<Chip
							onClick={this.follow_from_qview(this.props.userId)}
							avatar={<Avatar className="follow_button_color">{this.state.no_fol}</Avatar>}
							label={"Following"}
							className="qview_following_btn"
							onDelete={() => { }}
							deleteIcon={<Check className="white" />} />}
				</div>}<br></br><br></br>
				<div className="qview_bottom">
					<Grid container spacing={24}>
						<Grid item md={12} lg={6}>
							<div className="posted_info_answer_view">
								<Typography component="p" className="qview_detail">Posted</Typography>
								<Typography component="p" className="text_bold_600 qview_value">
									<b>{moment(this.props.date, moment.ISO_8601).fromNow()}</b>
								</Typography>
							</div>
						</Grid>
						<Grid item md={12} lg={6}>
							<div className="views_info_answer_view">
								<Typography component="p" className="qview_detail">
									Views
									  </Typography>
								<Typography component="p" className="qview_value text_bold_600">
									{this.props.views}
								</Typography>
							</div>
						</Grid>
					</Grid>
				</div>
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
				{/*{!this.props.userFollows &&
		          	<Typography component="p">
		            	Followed by {this.props.nFollows}
		          </Typography> }
		          {this.props.userFollows && 
		          	<Typography component="p" className="">
						  {(this.props.nFollows>1)? ((this.props.nFollows>2)? `You and ${this.props.nFollows-1} others follow`: 
						  `You and ${this.props.nFollows-1} other follow`
						  ):`You follow`}
		          	</Typography>
				  }*/}

			</Paper>
		);
	}
}

export default withRouter(QuesInfo);