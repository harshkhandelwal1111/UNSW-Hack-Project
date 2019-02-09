import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Cookie from '../cookie';
import Follower from './follower.js'
import Answer from './answer.js'
import urls from './../urls';

let BASE_URL = urls.API_URL;

class Feeds extends Component {
    state = {
        data0:[],
        data1:[],
        data2:[],
        data3:[],
        data4:[],
        data5:[],
        data6:[],
        node: 0,
        dataStillLoading: false,
        loadingState: false,
        value: 0,
        users: [],
        contentData: []
    };

    handleChange = (event, value) => {
        this.setState({ value, loadContent: true, users: [], contentData: [], node:0 },()=>{
            console.log(this.state.node)
            this.getContent(value)
        });
    };

    componentDidMount() {
        this.getContent(this.state.value);
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }

    handleScroll = () => {
        let lastScrollY = window.scrollY;
        if (this.refs.dataList && (lastScrollY+800) > this.refs.dataList.clientHeight && !this.state.dataStillLoading) {
            this.setState({ loadingState: true, node: this.state.node + 1 },
                () => {
                    this.getContent(this.state.value);
                }
            );
        }
    }

    getContent = (tabNo) => {
        this.setState({ loadingState: true, dataStillLoading: true });
        let cookie = Cookie.getCookie('CP');
        let username = this.props.username;
        let tab;
        switch (tabNo) {
            case 0:
                tab = 'answered';
                break;
            case 1:
                tab = 'asked';
                break;
            case 2:
                tab = 'followers';
                break;
            case 3:
                tab = 'bookmarked';
                break;
            case 4:
                tab = 'following';
                break;
            case 5:
                tab = 'following';
                break;
            case 6:
                tab = 'referred';
                break;
            default:
                tab = 'answered';
                break;
        }
        let url = 'content';
        if (tabNo === 2 || tabNo === 4 || tabNo === 6) {
            url = 'users';
        }
        axios.request({
            url: `${BASE_URL}/u/${username}/fetch/${url}?${tab}=true&node=${this.state.node}`,
            method: "GET",
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            let con = res.data
            if (con.code === 0) {
                this.setState({ loadContent: false });
                if (tabNo === 2 || tabNo === 4 || tabNo === 6) {
                    this.setState({ users: this.state.users.concat(con.userData)});
                    if(con.userData && con.userData.length===0) {
                        this.setState({loadingState: false});
                    }
                    if(con.userData && con.userData.length>0) {
                        this.setState({ loadingState: false, dataStillLoading: false });
                    }
                    return;
                }
                this.setState({ contentData: this.state.contentData.concat(con.userData) });

                if(con.userData && con.userData.length===0) {
                    this.setState({loadingState: false});
                }

                if(con.userData && con.userData.length>0) {
                    this.setState({ loadingState: false, dataStillLoading: false });
                }
            }
            else {
                this.setState({ userFound: false, loadContent: false });
            }
        }, (err) => {
            this.setState({ loadContent: false });
        })
    }

    render() {
        let def_img = "https://res.cloudinary.com/codepark-in/image/upload/v1540543932/cp-user-avatars/049-robot-8.png";
        const { value } = this.state;
        return (
            <div id="matter">
                <AppBar position="static" color="default">
                    <Tabs
                        className="tags_theme"
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label={value === 0 ? `Answers ${this.state.contentData.length}` : `Answers`} />

                        <Tab label={value === 1 ? `Questions ${this.state.contentData.length}` : `Questions`} />

                        <Tab label={value === 2 ? `Followers ${this.state.users.length}` : `Followers`} />

                        {
                            this.props.personal &&
                            <Tab label={value === 3 ? `Bookmarks ${this.state.contentData.length}` : `Bookmarks`} />
                        }
                        {
                            this.props.personal &&
                            <Tab label={value === 4 ? `People you follow ${this.state.users.length}` : `People you follow`} />
                        }
                        {
                            this.props.personal &&
                            <Tab label={value === 5 ? `Questions you follow ${this.state.contentData.length}` : `Questions you follow`} />
                        }
                        {
                            this.props.personal &&
                            <Tab label={value === 6 ? `Reffered Users ${this.state.users.length}` : `Reffered Users`} />
                        }
                    </Tabs>
                </AppBar>
                {
                    this.state.loadContent &&

                    <div>
                        <CircularProgress className="only_theme_color loader center_loader loader_up" size={32} />
                    </div>
                }
                {
                    !this.state.loadContent && (this.state.users.length === 0 && this.state.contentData.length === 0) &&

                    <div>
                        <Typography className="nothing_to_show center_this loader_up" component="p">Nothing to show</Typography>
                    </div>
                }
                {
                    !this.state.loadContent &&

                    <div ref="dataList">
                        {this.state.value === 0 &&
                            <div id="all_answers">
                                {
                                    this.state.contentData.map((val, ind) => (
                                        <Answer
                                            key={ind}
                                            qid={val.uid}
                                            qname={val.qname}
                                            on={val.posted_on}
                                            q={val.question}
                                            answered={val.answered}
                                            a={val.answers}
                                            tag={val.tags}
                                            username={this.props.username}
                                            userAsked={val.user_asked}
                                            userAnswered={val.user_answered}
                                            userFollows={val.user_follows_question}
                                            nFollowers={val.question_followedBy}
                                            showIfAnswered={false}
                                        />
                                    ))

                                }
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }
                        {this.state.value === 1 &&
                            <div id="all_questions">
                                {
                                    this.state.contentData.map((val, ind) => (
                                        <Answer
                                            key={ind}
                                            qname={val.qname}
                                            qid={val.uid}
                                            on={val.posted_on}
                                            q={val.question}
                                            answered={val.answered}
                                            a={val.answers}
                                            tag={val.tags}
                                            username={this.props.username}
                                            userAsked={val.user_asked}
                                            userAnswered={val.user_answered}
                                            userFollows={val.user_follows_question}
                                            nFollowers={val.question_followedBy}
                                            showIfAnswered={true}
                                        />
                                    ))

                                }
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }
                        {this.state.value === 2 &&
                            <div id="all_followers"><br></br>
                                <Grid container spacing={24}>
                                    {
                                        this.state.users.map((val, ind) => (
                                            <Follower val={val} />
                                        ))
                                    }

                                </Grid>
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }
                        {this.props.personal && this.state.value === 3 &&
                            <div id="all_bookmarks">
                                {
                                    this.state.contentData.map((val, ind) => (
                                        <Answer
                                        key={ind}
                                        qname={val.qname}
                                        qid={val.uid}
                                        on={val.posted_on}
                                        q={val.question}
                                        answered={val.answered}
                                        a={val.answers}
                                        tag={val.tags}
                                        username={this.props.username}
                                        userAsked={val.user_asked}
                                        userAnswered={val.user_answered}
                                        userFollows={val.user_follows_question}
                                        nFollowers={val.question_followedBy}
                                        showIfAnswered={true}
                                        />
                                    ))

                                }
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }

                        {this.props.personal && this.state.value === 5 &&
                            <div id="all_followingContent">
                                {
                                    this.state.contentData.map((val, ind) => (
                                        <Answer
                                        key={ind}
                                        qname={val.qname}
                                        qid={val.uid}
                                        on={val.posted_on}
                                        q={val.question}
                                        answered={val.answered}
                                        a={val.answers}
                                        tag={val.tags}
                                        username={this.props.username}
                                        userAsked={val.user_asked}
                                        userAnswered={val.user_answered}
                                        userFollows={val.user_follows_question}
                                        nFollowers={val.question_followedBy}
                                        showIfAnswered={true}
                                        />
                                    ))

                                }
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }
                        {this.props.personal && this.state.value === 4 &&
                            <div id="all_followingUsers"><br></br>
                                <Grid container spacing={24}>
                                    {
                                        this.state.users.map((val, ind) => (
                                            <Grid item xs={12} sm={6}>
                                                <Paper className="fol_tab_fol1">
                                                    <div className="to_fol_profile">
                                                        <Grid container spacing={40}>
                                                            <Grid item xs={4}>
                                                                <Avatar alt="Username"
                                                                    src={(val.profile_image) ? val.profile_image : def_img}
                                                                    onClick={() => { window.location.href = `/user/${val.username}` }}
                                                                    className="image_in_fol" />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <Typography component="p" className="fol_full_name" onClick={() => { window.location.href = `/user/${val.username}` }}>{val.name.fullName}</Typography>
                                                                <Typography component="p" className="only_grey" onClick={() => { window.location.href = `/user/${val.username}` }}>@{val.username}</Typography>
                                                                <Typography component="p" className="fol_heading">Followers</Typography>
                                                                <Typography component="p" className="fol_num little_left only_grey">{val.number_of_followers}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }
                        {this.props.personal && this.state.value === 6 &&
                            <div id="all_referred"><br></br>
                                <Grid container spacing={24}>
                                    {
                                        this.state.users.map((val, ind) => (
                                            <Follower val={val} />
                                        ))
                                    }

                                </Grid>
                            {this.state.loadingState && this.state.dataStillLoading && !this.state.loadContent ?
                                (<div className="center-hor"><CircularProgress className="color-theme margin_20_up" size={32} /></div>) : ""}
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Feeds