import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
// import user from './../../images/aditya/user.jpg';
import earn_img from '../../images/common/earnings.png';
import acti_img from '../../images/common/worker.png';
import help_img from '../../images/common/support.png';
import inte_img from '../../images/common/idea.png';
import userimg from './../../images/common/username.png';


class UserInfo extends Component {

	render() {
		// console.log(this.props.tags)
		return (
			<div className="make_sticky">
			<Paper className="paper dashboard_user_info">
				<NavLink to={`/user/${this.props.username}`} className="text-decor">
					<Avatar alt="Username" 
		        	src={this.props.image? this.props.image:userimg}
		        	className="user-avatar-lg margin-auto" />
				</NavLink><hr className="hr_dash"/>
					<div className="c-align">
						<Typography component="p" id="user_stats">{this.props.fName}</Typography>
						<NavLink to={`/user/${this.props.username}`} className="text-decor">
							<Typography component="p">@{this.props.username}</Typography>
						</NavLink>
						<Typography component="p" id="about_dash">{this.props.about}</Typography>
					</div><br/>
                    <div className="center-vert">
                        <img src={earn_img} className="marg-one"/> <span><Typography component="p" className="f-bold little_bigger">Level: {this.props.level || 0}</Typography></span>
                    </div><br></br>
                    <div className="center-vert">
                        <img src={acti_img} className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Activeness: {this.props.activeness || 0}</Typography></span>
                    </div><br></br>
                    <div className="center-vert">
                        <img src={help_img} className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Helpfulness: {this.props.helpfulness || 0}</Typography></span>
                    </div><br></br>
                    <div className="center-vert">
                        <img src={inte_img} className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Intelligence: {this.props.intelligence || 0}</Typography></span>
                    </div><br></br>
                </Paper><br/>
				{/* <Paper>

				</Paper> */}
				</div>
	  	);
	}
}

export default UserInfo;