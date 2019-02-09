import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';
import moment from 'moment';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import { NavLink } from 'react-router-dom';
import Tag from './tag.js'
import Edit from '@material-ui/icons/Edit';
import RssFeed from '@material-ui/icons/RssFeed';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Cookie from '../cookie';
import urls from "../urls";
import Reaction from '../common/reaction';

let BASE_URL = urls.API_URL;

class Answer extends Component {
    state = {
        nFollowers: 0,
        userFollows: false
    }

    componentDidMount() {
        this.setState({
            userFollows: this.props.userFollows,
            nFollowers: this.props.nFollowers
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
                    else if (data.code === 1) {
                        this.setState({ openSnackbar: true, msgSnackbar: data.message });
                    }
                }.bind(this)
            )
            .catch(function(error) {
                this.setState({ openSnackbar: true, msgSnackbar: 'Could not follow. Please check your internet connection and retry.' });
            }.bind(this));
    };

    render() {
        return (
            <div className="user_page_answer">
                <Paper className="my_paper" elevation={1}>
                    <div className="tags_part">
                        {this.props.tag[0] !== "" &&
                            this.props.tag.map((val, ind) => (
                                <Tag tag_name={val} />
                            ))
                        }
                    </div>
                    <div className="question_title_part">
                        <NavLink className="navlink" to={`/question/view/${this.props.qname}/${this.props.qid}`}>
                            <Typography component="p" className="question_title">{this.props.q}</Typography>
                            <Typography component="p" className="view view_little_left">view</Typography>
                        </NavLink>
                    </div>
                    {this.props.showIfAnswered && this.props.answered && <div className="show_if_answered little_left">
                        <Typography className="question_has_been_answered" component="p">Question has been answered !</Typography>
                    </div>}
                    <div className="center-vert">
                        <div className="center-vert answer_option">
                            {(this.props.userAsked === false) ? (
                                <div className="mtop-one center-vert">

                                    {this.props.username !== localStorage.getItem('username') &&
                                        <NavLink to={`/answer/${this.props.qid}`} className="text-decor center-vert">
                                            <Button className="answer-btn little_left" style={{ borderRadius: '50px' }}>
                                                <Edit className="small-icon color-grey" />
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
                    {
                        this.props.a.map((val, ind) => (
                            <div className="feed-answer-bg">
                                {val.answer && val.answeredBy.username === this.props.username &&
                                    <div>
                                    <div className="center-vert little_left">
                                        <Typography component="p" className="answered_by_part dash_answered_by">
                                            <span className="little_space_right">{val.language.value}</span>
                                            <FiberManualRecord className="sep_dot little_space_right" />
                                            <span>
                                                {moment(val.posted_on, moment.ISO_8601).fromNow()}
                                            </span>
                                        </Typography>
                                    </div>
                                        {/*<Typography component="p" className="answered_by_part"><span className="text_bold_600">{val.answeredBy.username}</span> <FiberManualRecord className="sep_dot" /> <span className="text_bold_600">{val.language.value}</span> <FiberManualRecord className="sep_dot" /> <span className="text_bold_600">{moment(val.posted_on, moment.ISO_8601).fromNow()}</span></Typography>*/}
                                        <SyntaxHighlighter className="answer_code" language="cpp" style={monokaiSublime}>{val.answer}</SyntaxHighlighter>
                                    <div className="mleft-one">
                                        <Reaction questionId={this.props.qid}
                                            answerId={val.uid} userUpvoted={val.user_upvoted}
                                            userDownvoted={val.user_downvoted} nUpvotes={val.upvotes}
                                            nDownvotes={val.downvotes}
                                        />
                                    </div>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </Paper>
            </div>
        )
    }
}

export default Answer