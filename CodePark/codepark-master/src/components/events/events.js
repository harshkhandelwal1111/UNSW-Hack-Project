import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import Cookie from '../cookie';
import urls from './../urls';
import { NavLink } from 'react-router-dom';
import PrimarySearchAppBar from '../common/appbar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import MainAppbar from '../common/mainAppbar';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FooterBar from '../common/footerBar';

let BASE_URL=urls.COMPETE_URL
let BASE_URL1 = urls.API_URL;

class Events extends Component {
    constructor(props){
        super(props)
        this.get_events()
    }

    state = {
        events:[],
        no_active:0,
        data_has_come:false
    }

    get_events=()=>{
        let cookie = Cookie.getCookie('CP');
        let config = { headers: { Authorization: "Bearer " + cookie } };
        axios.get(BASE_URL + `/events`, cookie?config:'')
        .then((res)=>{
            this.setState({events:res.data.events,data_has_come:true});
            
            /**
             * Meta data is required for SEO
             * -----------------------------
             */
            let metaData = {
                title : `All Events | CodePark`,
                description : `Participate in CodePark's events and earn a great reputation in the Community and Prizes`,
                url : `https://codepark.in/events`,
                keywords : `CodePark,Events,coding challenges, competitive Programming challenges,programming battles,cool programming contests`
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
        })
    }

    show_event = (event_name) => {
        window.location.href = `/events/${event_name}`
    }

    checkActive=()=>{
        if (this.state.no_active !== 1) {
            this.setState({ no_active: 1 })
        }
    }

    render() {
            // setTimeout(() => {
                // this.setState({
                // 
                // })
            // }, 60000);
        return (
            <div className="all_events">
                {Cookie.getCookie('CP') && <PrimarySearchAppBar /> || <MainAppbar />}
                <div className="c-align">
                <Typography component="p" className="events_heading only_grey">Events</Typography>
                </div>
                <div className="events_grid">
                    <Grid container spacing={40}>
                        <Grid item xs={12} md={6}>
                        <Paper elevation={4}>
                            <div>
                                <div className="active_header c-align">
                                    <Typography component="p" className="active_ended_headings">ACTIVE</Typography>
                                </div>
                                {this.state.events.length===0 && <div className="c-align">
                                    <CircularProgress className="only_theme_color margin_20_up margin_20_down" size={32} />
                                </div>}
                                {
                                    this.state.events && this.state.events.map((val, ind) => (
                                            <div>
                                            {val.end >= moment().unix() && <div className="one_event_paper" elevation={6}>
                                                {this.checkActive()}
                                                <img className="event_pic" src={val.image} />
                                                <Typography onClick={() => { this.show_event(val.urlName) }} component="p" className="event_name pointer">{val.name}</Typography>
                                                <Typography component="p" className="only_grey monospace start_time">Starts</Typography>
                                                <Typography component="p" className="only_grey monospace start_time">{moment.unix(Number(val.start)).format("llll")}</Typography>
                                                <Button className="event_explore_button" onClick={() => { this.show_event(val.urlName) }}>Explore</Button>
                                                {val.userParticipation && <Button className="event_explore_button little_left" onClick={() => { window.location.href = `/events/${val.urlName}/progress` }}>See progress</Button>}               
                                            </div>}
                                        </div>
                                    ))
                                }
                                {
                                    this.state.no_active==0 && this.state.data_has_come &&
                                    <div className="center_this">
                                    <Typography component="p" className="no_active_events">No active events</Typography>
                                    </div>
                                }
                            </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Paper elevation={4}>
                            <div>
                                <div className="active_header c-align">
                                    <Typography component="p" className="active_ended_headings">ENDED</Typography>
                                </div>
                                {this.state.events.length === 0 && <div className="c-align">
                                    <CircularProgress className="only_theme_color margin_20_up margin_20_down" size={32} />
                                </div>}
                                {
                                    this.state.events && this.state.events.map((val, ind) => (
                                        <div>
                                            {val.end < moment().unix() && <div className="one_event_paper_done" elevation={6}>
                                                <img className="event_pic" src={val.image} />
                                                <Typography onClick={() => { this.show_event(val.urlName) }} component="p" className="event_name pointer">{val.name}</Typography>
                                                <Button className="event_explore_button" onClick={() => { this.show_event(val.urlName) }}>Explore</Button>
                                                {val.userParticipation && <Button className="event_explore_button little_left" onClick={() => { window.location.href = `/events/${val.urlName}/progress` }}>See progress</Button>}
                                                
                                            </div>}
                                        </div>
                                    ))
                                }
                            </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    {/*<Grid container spacing={40} justify="center" alignItems="center">
                    {
                        this.state.events && this.state.events.map((val,ind)=>(
                            <Grid item xs={12} sm={6} lg={3}>
                                <Paper className="event_paper">
                                    <img className="event_pic" src={val.image} />
                                    <div className="event_info">
                                        <Typography className="event_name" component="p">{val.name}</Typography>
                                        {val.start >= moment().unix() - 19800 && <div>
                                                <Typography className="event_starts_heading" component="p">Starts on</Typography>
                                                <Typography className="event_date" component="p">{moment.unix(Number(val.start) - 19800).format("llll")}</Typography>
                                        </div>}
                                        {val.start < moment().unix() - 19800 && <div>
                                                <Typography className="event_starts_heading" component="p">Ends on</Typography>
                                                <Typography className="event_date" component="p">{moment.unix(Number(val.end) - 19800).format("llll")}</Typography>
                                        </div>}
                                        {val.start < moment().unix() - 19800 && <div className="time_eve">
                                        <Typography className="event_starts_heading" component="p">Time left</Typography>
                                        <div className="event_days">
                                            <Typography className="event_date" component="p">{Math.max(0,moment.unix(Number(val.end) - 19800).diff(moment(), 'days'))}</Typography>
                                            <Typography className="event_countdown_names" component="p">Days</Typography>
                                        </div>
                                        <div className="event_hours">
                                            <Typography className="event_date" component="p">{Math.max(0,moment.unix(Number(val.end) - 19800).diff(moment(), 'hours') % 24)}</Typography>
                                            <Typography className="event_countdown_names" component="p">Hours</Typography>
                                        </div>
                                        <div className="event_minutes">
                                            <Typography className="event_date" component="p">{Math.max(0,moment.unix(Number(val.end) - 19800).diff(moment(), 'minutes') % (60))}</Typography>
                                            <Typography className="event_countdown_names" component="p">Minutes</Typography>
                                        </div>
                                        </div>}
                                        {val.start >= moment().unix() - 19800 && <div className="time_eve">
                                            <Typography className="event_starts_heading" component="p">Time left</Typography>
                                            <div className="event_days">
                                                <Typography className="event_date" component="p">{Math.max(0, moment.unix(Number(val.start) - 19800).diff(moment(), 'days'))}</Typography>
                                                <Typography className="event_countdown_names" component="p">Days</Typography>
                                            </div>
                                            <div className="event_hours">
                                                <Typography className="event_date" component="p">{Math.max(0, moment.unix(Number(val.start) - 19800).diff(moment(), 'hours') % 24)}</Typography>
                                                <Typography className="event_countdown_names" component="p">Hours</Typography>
                                            </div>
                                            <div className="event_minutes">
                                                <Typography className="event_date" component="p">{Math.max(0, moment.unix(Number(val.start) - 19800).diff(moment(), 'minutes') % (60))}</Typography>
                                                <Typography className="event_countdown_names" component="p">Minutes</Typography>
                                            </div>
                                        </div>}
                                        <br></br>
                                        <Button className="event_explore_button" onClick={() => { this.show_event(val.urlName) }}>Explore</Button>
                                    </div>
                                </Paper>
                            </Grid>
                        ))
                    }
                    {!this.state.events.length && <CircularProgress className="middle_circle only_theme_color" size={32} />}
                </Grid>*/}
                </div>
                <FooterBar/>
            </div>
        )
    }
}

export default Events