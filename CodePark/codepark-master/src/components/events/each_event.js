import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Cookie from '../cookie';
import urls from './../urls';
import { NavLink } from 'react-router-dom';
import PrimarySearchAppBar from '../common/appbar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import MainAppbar from '../common/mainAppbar';
import axios from 'axios';
import CheckCircle from '@material-ui/icons/CheckCircle'
import Assignment from '@material-ui/icons/Assignment'
import { CircularProgress } from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import FooterBar from '../common/footerBar';


let BASE_URL = urls.COMPETE_URL;
let BASE_URL1 = urls.API_URL;

class OneEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'none',
            data: {},
            message: ''
        }
        this.get_the_picture()
        this.get_details()
    }
    get_the_picture = () => {
        let cookie = Cookie.getCookie('CP');
        if (cookie) {
            let config = { headers: { 'Authorization': 'Bearer ' + cookie } }
            axios.get(BASE_URL1 + '/u/basic', config).then((res) => {
                let user = res.data.userData;
                localStorage.setItem('userimg', user.profile_image);
            })
        }
    }
    get_details = () => {
        let cookie = Cookie.getCookie('CP');
        if (cookie) {
            axios.get(`${BASE_URL}/events/details/${this.props.match.params.name}`, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            })
                .then((res) => {
                    // console.log(res.data)
                    this.setState({
                        status: res.data.userHasRegistered && 'registered' || 'none',
                        data: res.data.event
                    })
                    
                    /**
                     * Meta data is required for SEO
                     * -----------------------------
                     */
                    let eventData = res.data.event;
                    let metaData = {
                        title : `${eventData.name} | Event | CodePark`,
                        description : `${eventData.description}`,
                        url : `https://codepark.in/events/${eventData.urlName}`,
                        keywords : `CodePark,Events,${eventData.name}`
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
        else {
            axios.get(`${BASE_URL}/events/details/${this.props.match.params.name}`)
                .then((res) => {
                    // console.log(res.data)
                    this.setState({
                        status: 'none',
                        data: res.data.event
                    })
                    
                    /**
                     * Meta data is required for SEO
                     * -----------------------------
                     */
                    let eventData = res.data.event;
                    let metaData = {
                        title : `${eventData.name} | Event | CodePark`,
                        description : `${eventData.description}`,
                        url : `https://codepark.in/events/${eventData.urlName}`,
                        keywords : `CodePark,Events,${eventData.name}`
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
    }
    register_codece = () => {
        let cookie = Cookie.getCookie('CP');
        if (this.state.status !== 'registered') {
            if (Cookie.getCookie('CP')) {
                this.setState({
                    status: 'registering'
                })
                axios.post(BASE_URL + `/events/register/${this.props.match.params.name}`, {}, {
                    headers: {
                        Authorization: "Bearer " + cookie
                    }
                }).then((res) => {
                    this.setState({
                        status: 'registered',
                        message: res.data.message
                    })
                })
            }
            else {
                localStorage.setItem('about_to_register', this.props.match.params.name)
                window.location.href = "/login"
            }
        }
    }

    go_to_progress_page = () => {
        window.location.href = `/events/${this.props.match.params.name}/progress`
    }

    render() {
        let organizers=true
        let organized_by = [{ logo: "https://res.cloudinary.com/codepark-in/image/upload/v1547141970/events/clash-of-codes.jpg", name: "Shivank Sahai" }, { logo:"https://res.cloudinary.com/codepark-in/image/upload/v1547141970/events/clash-of-codes.jpg",name:"Raj Chandra"}]
        return (
            <div>
                {this.state.data && <div className="each_event_info">
                    {Cookie.getCookie('CP') && <PrimarySearchAppBar /> || <MainAppbar />}
                    <div className="christmas_gradient hr-vr-center event_color_name">
                        <Typography component="p" className="codece_title">{this.state.data.name}</Typography><br />
                        <Typography component="p" className="codece_subtitle">Come be a part of the biggest coding extravaganza yet!</Typography>
                        <div className="register_things">
                            {this.state.status === 'registered' && <Button className="to_progress_btn" onClick={this.go_to_progress_page}>See progress</Button>}
                            {Number(this.state.data.end) > moment().unix() && <div>
                                {this.state.status !== 'registered' && <Button className="codece_register_top" onClick={this.register_codece}>{this.state.status === 'registering' && 'REGISTERING' || 'REGISTER'}{this.state.status === 'none' && <Assignment className="register_icon" /> || this.state.status === 'registering' && <CircularProgress size={32} className="register_icon only_theme_color" />}</Button>}
                                {this.state.status==='registered' && this.state.message && <Typography component="p" className="registered_message white">{this.state.message}</Typography>}
                            </div> || <div><Button className="ended_message" disabled>Event has ended</Button></div>}
                        </div> 
                    </div>
                    <div className="all_event_info">
                        <div className="about_event">
                            <Typography component="p" className="event_heading">Description</Typography>
                            <hr className="event_hr"></hr>
                            <div className="info_part" dangerouslySetInnerHTML={{ __html: this.state.data.description }} />
                        </div>
                        <div className="guidelines_event">
                            <Typography component="p" className="event_heading">Guidelines</Typography>
                            <hr className="event_hr"></hr>
                            <div className="info_part" dangerouslySetInnerHTML={{ __html: this.state.data.guidelines }} />
                            </div>
                        <div className="time_event">
                            <Grid container spacing={40} alignItems="center">
                                <Grid item md={4} xs={12}>
                                    <Typography component="p" className="event_heading">Start time</Typography>
                                    <hr className="event_hr"></hr>
                                    <Typography component="p" className="info_part text_bold_600">{moment.unix(Number(this.state.data.start)).format("llll")}</Typography>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Typography component="p" className="event_heading">End time</Typography>
                                    <hr className="event_hr"></hr>
                                    <Typography component="p" className="info_part text_bold_600">{moment.unix(Number(this.state.data.end)).format("llll")}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="criteria_event">
                            <Typography component="p" className="event_heading">Winning Criteria</Typography>
                            <hr className="event_hr"></hr>
                            <div className="info_part" dangerouslySetInnerHTML={{ __html: this.state.data.winningCriteria }} />
                        </div>
                        <div className="prizes_event">
                            <Typography component="p" className="event_heading">Reward</Typography>
                            <hr className="event_hr"></hr>
                            <Typography component="p" className="info_part text_bold_600">{this.state.data.reward}</Typography>
                        </div>
                        {this.state.data.organized_by && this.state.data.organized_by.length>0 && <div className="organizers_event">
                            <Typography component="p" className="event_heading">Organizers</Typography>
                            <hr className="event_hr"></hr>
                            <div>
                                <Grid container spacing={24}>
                                {
                                    this.state.data.organized_by.map((val,ind)=>(
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Paper elevation={4} className="event_org center_this" onClick={() => { window.location.href = `${val.link}` }}>
                                                <Avatar className="org_logo" src={val.logo}></Avatar>
                                                <Typography className="event_orgname" component="p">{val.name}</Typography>
                                            </Paper>
                                        </Grid>
                                    ))
                                }
                                </Grid>
                            </div>
                        </div>}
                        <div className="faqs_event">
                            <Typography component="p" className="event_heading">FAQs</Typography>
                            <hr className="event_hr events_page_hr"></hr>
                            {
                                this.state.data.faq && this.state.data.faq.map((val, ind) => (
                                    <div>
                                        <Typography component="p" className="info_part text_bold_600">Q. {val.question}</Typography><br></br>
                                        <Typography component="p" className="info_part">A. {val.answer}</Typography>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="register_things c-align">
                        {this.state.status === 'registered' && <Button className="to_progress_btn" onClick={this.go_to_progress_page}>See progress</Button>}
                        {Number(this.state.data.end) > moment().unix() && <div>
                                {this.state.status !== 'registered' && <Button className="codece_register" onClick={this.register_codece}>{this.state.status === 'registering' && 'REGISTERING' || 'REGISTER'}{this.state.status === 'none' && <Assignment className="register_icon" /> || this.state.status === 'registering' && <CircularProgress size={32} className="register_icon only_theme_color" />}</Button>}
                                {this.state.status === 'registered' && this.state.message && <Typography component="p" className="registered_message">{this.state.message}</Typography>}
                        </div> || <div className="c-align"><Button className="ended_message" disabled>Event has ended</Button></div>}
                        </div>
                    {/*<Switch checked={this.state.checked} onChange={this.handleChange} aria-label="Collapse" />
                <Slide direction="up" in={this.state.checked} mountOnEnter unmountOnExit>
                    <Paper elevation={1} className="paper registration_done_paper">
                        <Typography component="p" className="registration_done_congrats">Congratulations!!</Typography>
                        <Typography component="p" className="registration_done_for_what_message">You have successfully registered for Code ce Christmas !! All the best !! </Typography>
                    </Paper>
                </Slide>*/}
                </div>
                </div>}
                <FooterBar/>
            </div>
        )
    }
}

export default OneEvent