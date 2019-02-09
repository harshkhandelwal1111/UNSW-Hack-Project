import React,{Component} from 'react';
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import PrimarySearchAppBar from '../common/appbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Cookie from '../cookie';
import urls from './../urls';
import axios from 'axios';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accept from '../../images/common/accept.png';
import Follow from '../../images/common/follow.png';
import Upvote from '../../images/common/upvote.png';
import Admin from '../../images/common/admin.png';
import Answer from '../../images/common/answer.png';
// import Create from '@material-ui/icons/Create'
import FooterBar from '../common/footerBar';

let BASE_URL = urls.API_URL;

class Notifs extends Component{
    constructor(props){
        super(props)
        this.state={
            arrived:false,
            notifs:[],
            total_unread:0
        }
        this.getNotifications()
    }

    getNotifications = () => {
    let cookie = Cookie.getCookie('CP');
    let config = {headers: {'Authorization': 'Bearer '+cookie}}
    axios.get(BASE_URL + '/u/notifications', config)
    .then((res)=>{
        console.log(res.data)
        this.setState({
            arrived:true,
            notifs:res.data.notifications,
            total_unread: res.data.no_of_unread_notifications
        })
        this.read_all()
    })
    }

    read_all=()=>{
            let cookie = Cookie.getCookie('CP');
            let config = {
                headers: { 'Authorization': 'Bearer ' + cookie },
            }
            axios.post(BASE_URL + '/u/notifications', {}, config);
    }

	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Notifications | CodePark`,
			description : `View your lastest Notifications`,
			url : `https://codepark.in/notifications`,
			keywords : `CodePark,coding,competitive programming,interview prepration,coding round prepration,recent questions,unanswered questions`
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
    render(){
        return(
            <div className="notifs_div">
                <PrimarySearchAppBar />
                <Typography component="p" className="all_notifs notifs_heading">Notifications</Typography>
                {/* <hr className="notifs_hr"></hr> */}
                {this.state.total_unread>0 && <Typography component="p" className="new_notifs_number">You have {this.state.total_unread} new {this.state.total_unread>1 && 'notifications' || 'notification'}</Typography>}
                <div className="all_notifs">
                    {this.state.notifs.length>0 &&
                        <List>
                            {
                                this.state.notifs.map((val,ind)=>(
                                    <div>
                                {val.unread && <div className="notif_read">
                                    <ListItem className="one_new_notif pointer" onClick={() => { window.location.href = val.link }}>
                                        <ListItemAvatar>
                                            <Avatar src={val.type === 'user_was_followed' && Follow || val.type === 'user_question_answered' && Answer || val.type === 'user_answer_upvoted' && Upvote || val.type === 'user_answer_accepted' && Accept || Admin} />

                                        </ListItemAvatar>
                                        <ListItemText primary={val.notification} secondary={moment(val.created_at, moment.ISO_8601).fromNow()} />
                                    </ListItem>
                                </div>}
                                    {!val.unread && <div className="notif_read">
                                    <ListItem className="one_notif pointer" onClick={()=>{ window.location.href=val.link }}>
                                        <ListItemAvatar>
                                        <Avatar src={val.type === 'user_was_followed' && Follow || val.type === 'user_question_answered' && Answer || val.type === 'user_answer_upvoted' && Upvote || val.type === 'user_answer_accepted' && Accept || Admin} />
                                            
                                        </ListItemAvatar>
                                    <ListItemText primary={val.notification} secondary={moment(val.created_at, moment.ISO_8601).fromNow()} />
                                    
                                    </ListItem>
                                    {/* <hr className="hr_notifs"></hr> */}
                                    </div>}
                                    </div>
                                ))
                            }
                        </List>}
                    {this.state.notifs.length===0 && !this.state.arrived && <CircularProgress size={32} className="loader_center only_theme_color" />}
                    {this.state.notifs.length===0 && this.state.arrived && <Typography component="p" className="no_new_notifs">You have no new notifications</Typography>}
                </div>
                <FooterBar/>
            </div>
        )
    }
}

export default Notifs