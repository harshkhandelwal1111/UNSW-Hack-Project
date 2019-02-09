import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RssFeed from '@material-ui/icons/RssFeed';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
// import KeyBoardArrowDown from '@material-ui/icons/KeyboardArrowDown';
// import KeyBoardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Reaction from '../common/reaction';
import Button  from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import urls from "../urls";
import Cookie from '../cookie';
import userimg from './../../images/common/username.png';
import Tag from './../profile/tag.js'

let BASE_URL = urls.API_URL;

class Feed extends Component {
	// getUser = () => {
	// 	this.props.history.push(`/${this.props.askedBy}`);
	// }

	state = {
		nFollowers: 0,
		userFollows: false,
		userUpvoted: false,
		userDownvoted: false,
		nUpvotes: 0,
		nDownvotes: 0
	}

	componentDidMount() {
		this.setState({userFollows: this.props.userFollows, 
			nFollowers: this.props.nFollowers,
			nUpvotes: this.props.nUpvotes,
			nDownvotes: this.props.nDownvotes,
			userUpvoted: this.props.userUpvoted,
			userDownvoted: this.props.userDownvoted
		});
	}

	followQues = () => {
		let cookie = Cookie.getCookie("CP");
		let config = { headers: { Authorization: "Bearer " + cookie } };
		axios
		  .post(
			`${BASE_URL}/content/questions/follow/${this.props.qid}`,
			{},
			config
		  )
		  .then(
			function(response) {
			  let data = response.data;
			  if (data.code === 0) {
				this.setState({
				  userFollows: data.follower,
				  nFollowers: data.count
				});
			  }
			  else if(data.code === 1) {
				this.setState({openSnackbar: true, msgSnackbar: data.message});
			  }
			}.bind(this)
		  )
		  .catch(function(error) {
			this.setState({openSnackbar: true, msgSnackbar: 'Could not follow. Please check your internet connection and retry.'});
		  }.bind(this));
	  };

	render() {
		// console.log(this.props.lang);
		return(
			<div className="">
				<Paper className="each_answer no_bradius" elevation={1}>
				<div className="to_rem_right">
					<div className="tags_part_dash">
						{this.props.tags && this.props.tags[0] !== "" &&
							this.props.tags.map((val, ind) => (
								<Tag tag_name={val} />
							))
						}
					</div>

		        	<NavLink to={`/question/view/${this.props.qname}/${this.props.qid}`} className="text-decor">
						<Typography component="p" className="qtitle f-bold pointer mtop-half">{this.props.question}</Typography>
						<Typography component="p" className="view view_little_left">view</Typography>
		        	</NavLink>
		        	<div className="center-vert">
			        	<div className="center-vert answer_option">
			        		{(this.props.userAsked===false) ? (
								<div className="mtop-one center-vert">

								{this.props.userAnswered===false &&
								<NavLink to={`/answer/${this.props.qid}`} className="text-decor center-vert">
									<Button className="answer-btn" style={{borderRadius: '50px'}}>
										<Edit className="small-icon color-grey"/>
										<Typography component="p" className="text-trans mright-half">Answer</Typography>
									</Button>
								</NavLink>}
								{this.state.userFollows ? (
									<Button
										className="center-vert follow-dash-btn text-decor mleft-half color-blue"
										onClick={this.followQues}
									>
										<RssFeed />
										<Typography
										component="p"
										className="mright-half pointer text-trans color-blue"
										>
										Following | {this.state.nFollowers}
										</Typography>
									</Button>
									) : (
									<Button
										className="center-vert text-decor follow-dash-btn mleft-half color-grey"
										onClick={this.followQues}
									>
										<RssFeed />
										<Typography
										component="p"
										className="mright-half pointer text-trans color-grey"
										>
										Follow | {this.props.nFollowers}
										</Typography>
									</Button>
									)}
								</div>
								 ) : 
								(this.state.userAnswered &&
								<div className="color-grey"></div>)}
			        	</div>
		        	</div>
					</div>
		        	{this.props.answered && !this.props.hide && 
		        	<div className="feed-answer-bg">
							{/* <hr className="ninety-width"/> */}
		        		<div className="center-vert to_rem_right">
		        				{this.props.approved &&
		        					<IconButton><CheckCircle className="color-theme" /></IconButton>
								}
								<NavLink to={`/user/${this.props.answeredBy}`} className="center-vert text-decor">
									<Avatar alt={this.props.answeredBy}
										src={this.props.answeredImg? this.props.answeredImg : userimg}
										className="user-avatar-sm mright-one"
									/>
									<div className="center-vert">
										<Typography component="p" className="mright-half">{this.props.answeredBy}</Typography>
										{!!this.props.answeredByAbout && 
										<p className="color-grey-text">{this.props.answeredByAbout.slice(0,20)}
										{this.props.answeredByAbout.length>20 && '...'}</p>}
									</div>
								</NavLink>
							</div>
							<div className="mleft-one center-vert">
							  <Typography component="p" className="answered_by_part dash_answered_by">
									<span className="little_space_right">{this.props.language}</span> 
									<FiberManualRecord className="sep_dot little_space_right" />
									<span>
									{moment(this.props.answerDate, moment.ISO_8601).fromNow()}
									</span>
								</Typography>
								{/*{this.props.language && <p className="color-grey text_bold_600">{this.props.language}</p>}
								<FiberManualRecord className="sep_dot" />
								{this.props.answerDate && <p className="color-grey text_bold_600">
										{moment(this.props.answerDate, moment.ISO_8601).fromNow()}</p>}*/}
							</div>
							<div className="answer-display">
								<SyntaxHighlighter language={this.props.language} style={monokaiSublime} >
									{this.props.answer}
								</SyntaxHighlighter>
							</div>
							<div className="mleft-one">
								<Reaction questionId={this.props.qid}
									answerId = {this.props.ansid} userUpvoted={this.props.userUpvoted} 
									userDownvoted={this.props.userDownvoted} nUpvotes={this.props.nUpvotes} 
									nDownvotes={this.props.nDownvotes}
									/>
							</div>
							</div>}
		      	</Paper>
		    </div>
		);
	}
}

export default Feed;