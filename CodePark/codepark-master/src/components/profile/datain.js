import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookie from '../cookie';
import { NavLink } from 'react-router-dom';
import SelectedTags from './selected_tags.js'
import Education from './education.js'
import Stats from './stats.js'
import Feeds from './feeds.js'
import InfoGrid from './infogrid.js'
import urls from './../urls';

let BASE_URL = urls.API_URL;

class DataIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            profile_image: '',
            user_already_follows: false,
            personal: false,
            no_of_followers: 0,
            no_of_answers: 0,
            no_of_questions: 0,
            no_of_topics: 0,
            isModerator: false,
            isAdministrator: false,
            education: [],
            activeness: 0,
            intelligence: 0,
            helpfulness: 0,
            level: 0,
            total_points: 0,
            uid: '',
            ques: [],
            ans: [],
            bookmarks: [],
            followers: [],
            following_content: [],
            following_users: [],
            userFound: true,
            errMsg: ''
        }
        this.getInfo();
        // this.getContent();
    }

    rerender_whole_app = () => {
        this.forceUpdate()
    }

    getInfo = () => {
        let cookie = Cookie.getCookie('CP');
        let username = this.props.username;
        axios.request({
            url: `${BASE_URL}/u/${username}/basic`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            let inf = res.data
            if (inf.code === 0) {
                /**
                 * Meta data is required for SEO
                 * -----------------------------
                 */
                let metaData = {
                    title : `${inf.userData.name.fullName} (@${inf.userData.username}) | CodePark`,
                    description : `View ${inf.userData.name.fullName}'s profile at CodePark`,
                    url : `https://codepark.in/user/${inf.userData.username}`,
                    keywords : `CodePark,${inf.userData.name.fullName},${inf.userData.username}`
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
                this.setState({
                    uid: inf.userData.uid,
                    name: inf.userData.name,
                    userName: inf.userData.username,
                    about: inf.userData.about,
                    profile_image: inf.userData.profile_image,
                    user_already_follows: inf.userData.user_follows,
                    personal: inf.personal,
                    no_of_followers: inf.userData.number_of_followers,
                    no_of_answers: inf.userData.number_of_answers,
                    no_of_questions: inf.userData.number_of_questions,
                    no_of_topics: inf.userData.number_of_topic,
                    isModerator: inf.userData.is_site_Moderator,
                    isAdministrator: inf.userData.is_site_administrator,
                    education: inf.userData.education_details,
                    activeness: inf.userData.stats.activeness,
                    intelligence: inf.userData.stats.intelligence,
                    helpfulness: inf.userData.stats.helpfulness,
                    level: inf.userData.stats.level,
                    total_points: inf.userData.total_points,
                    tags: inf.userData.topics
                })
            }
            else {
                // this.props.history.push(`/error/${inf.message}`);
                this.setState({ userFound: false, errMsg: "We couldn't find the user you were looking for!" });
            }
        }, (err) => {
        })
    }

    render() {
        return (
            this.state.userFound ? (

                !this.state.name && <CircularProgress size={32} className="only_theme_color center_of_page" /> || this.state.name && <Grid container spacing={24}>
                    <Grid item sm={1} md={1} lg={2}></Grid>
                    <Grid item xs={12} sm={10} md={7} lg={6}>
                        <InfoGrid allData={this.state} getInfo={this.getInfo} name={this.state.name} uname={this.state.userName} profile_image={this.state.profile_image} personal={this.state.personal} al_follow={this.state.user_already_follows} no_of_followers={this.state.no_of_followers} admin={this.state.isAdministrator} mode={this.state.isModerator} total_points={this.state.total_points} />

                        <Hidden smUp>
                            <Stats
                                activeness={this.state.activeness} helpfulness={this.state.helpfulness} intelligence={this.state.intelligence} level={this.state.level} />

                        </Hidden>
                        <Feeds
                            user_uid={this.state.uid}
                            personal={this.state.personal}
                            // ques={this.state.ques} ans={this.state.ans} 
                            // book={this.state.bookmarks}
                            // followC={this.state.following_content} 
                            // followers={this.state.followers} 
                            // fol_users={this.state.following_users} 
                            username={this.props.username}
                            no_of_answers={this.state.no_of_answers}
                            no_of_questions={this.state.no_of_questions}
                        />
                    </Grid>
                    <Hidden smDown>
                        <Grid item sm={false} md={3} lg={2}>
                            <Stats activeness={this.state.activeness} helpfulness={this.state.helpfulness} intelligence={this.state.intelligence} level={this.state.level} />
                            {this.state.personal && <SelectedTags tags={this.state.tags} />}
                            <Education personal={this.state.personal} education={this.state.education} />
                        </Grid>
                    </Hidden>
                    <Grid item sm={1} md={1} lg={2}></Grid>
                </Grid>
            ) : (
                    <div className="signup center-vert">
                        {/* {this.state.errMsg} */}
                        <Paper className="paper">
                            <Typography variant="title" className="title">{this.state.errMsg}</Typography><br /><br />
                            <NavLink to="/" className="navlink-text center-hor">Back to codepark.in</NavLink>
                        </Paper>
                    </div>
                )
        )
    }

}

export default DataIn