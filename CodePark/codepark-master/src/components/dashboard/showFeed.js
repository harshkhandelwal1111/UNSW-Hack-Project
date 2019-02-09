import React, { Component } from 'react';
import Feed from './feed';
import urls from '../urls';
import Cookie from '../cookie';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

let BASE_URL = urls.API_URL;

class ShowFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
            language: 'cpp',
            loadingState: false,
            request_number: 1,
            dataStillLoading: false,
            vertical: 'top',
            horizontal: 'center',
            openSnackbar: false,
            msgSnackbar: ''
        }
        // window.addEventListener('scroll', this.handleScroll);
	}

    componentDidMount(){
        let {pathname} = this.props.location;
        // this.setState({route: route});
        this.getData();
        if(pathname==='/' || pathname==='/dashboard') {
            window.addEventListener('scroll', this.handleScroll, true);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }

    onClose = () => {
        this.setState({openSnackbar: false});
    }

    handleScroll = () => {
        let lastScrollY = window.scrollY;
        if((lastScrollY + 800) >  this.refs.dataList.clientHeight && !this.state.dataStillLoading){
            this.setState({loadingState : true, request_number: this.state.request_number},
                () => {
                    this.getData();
                }
            );
        }
    }

	getData = () => {
        let {pathname} = this.props.location;
        this.setState({ loadingState: true, dataStillLoading: true });
		let cookie = Cookie.getCookie('CP');
		let config = {
            headers : {'Content-Type' : 'application/json','Authorization':'Bearer '+cookie},
        }
        let url;

        if(pathname === '/questions/recent') {
            url = `${BASE_URL}/content/questions/unanswered?type=new`;
        }
        else if(pathname === '/questions/unanswered') {
            url = `${BASE_URL}/content/questions/unanswered?type=user`;
        }
        else {
            url = BASE_URL + `/dashboard?node=${this.state.request_number}`;
        }
		axios.get(url,config)
		.then(function(response) {
            let data = response.data;
            if(data.code === 0) {
                let questions = this.state.questions.concat(data.content);
                if(questions) {
                    this.setState({questions , loadingState: false, dataStillLoading: false});
                }
                if(data.message) {
                    this.setState({msgSnackbar: data.message, openSnackbar: true});
                }
            }
		}.bind(this))
		.catch(function(error) {
			console.log(error)
		});
	}
	render() {
        let { questions, vertical, horizontal, openSnackbar, msgSnackbar } = this.state;
        let {pathname} = this.props.location;
		let toShow=[];
		if(questions) {
			for(let index=0;index<questions.length;index++) {
				let question = questions[index];
                var lang;
                let list = ['cpp','python','cs','css','go','haskell','java',
                'javascript','kotlin','php','ruby','sql'];
				if(question && question.answered) {
                    let language = question.answers[0].language.value.toLowerCase();
                    if(list.includes(language)) {
                        lang = language;
                    }
                    else {
                        lang = 'cpp';
                    }
                }
                // console.log(lang);
                let x = question.askedBy.username;
				if(x) {
					toShow.push(
						<div key={index}>
							{!question.answered && 
                                <Feed
                                    askedBy={question.askedBy.username} 
                                    question={question.question} 
                                    qname={question.qname}
                                    subquestion={question.questionDetail} 
                                    answered={question.answered} 
                                    nFollowers={question.question_followedBy}
                                    tags={question.tags} 
                                    userFollows={question.user_follows_question} 
                                    qid={question.uid} 
                                    askedImg={question.askedBy.profile_image}
                                    userAsked={question.user_asked}
                                    userAnswered={question.user_answered}
                                    history={this.props.history}
                            />}

							{question.answered && 
                                <Feed 
                                    askedBy={question.askedBy.username} 
                                    question={question.question} 
                                    qname={question.qname}
                                    subquestion={question.questionDetail} 
                                    answered={question.answered} 
                                    nFollows={question.number_of_followers} 
                                    tags={question.tags}
                                    nFollowers={question.question_followedBy}
                                    userFollows={question.user_follows_question}
                                    userAsked={question.user_asked}
                                    userAnswered={question.user_answered}
                                    askedImg={question.askedBy.profile_image}
                                    answeredImg={question.answers[0].answeredBy.profile_image}
							        answer={question.answers[0].answer} 
							        language={lang} qid={question.uid} ansid={question.answers[0].uid}
                                    answeredBy={question.answers[0].answeredBy.username} 
                                    answeredByAbout={question.answers[0].answeredBy.about}
                                    answerDate={question.answers[0].posted_on}
                                    approved={question.answers[0].approved} 
                                    userUpvoted={question.answers[0].user_upvoted}
                                    userDownvoted={question.answers[0].user_downvoted}
                                    nUpvotes={question.answers[0].upvotes}
                                    nDownvotes={question.answers[0].downvotes}
							        hide={question.answers[0].isHidden}
                                />}
                                {(pathname==='/questions/recent' || pathname==='/questions/unanswered') && 
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={openSnackbar}
                                    message={msgSnackbar}
                                    autoHideDuration={4000}
                                    onClose={this.onClose}
                                />}
						</div>
					)
				}
			}
        }
		return(
            <div ref="dataList">
                {toShow.length >0 ? toShow :
                    <div className="c-align">
                        <CircularProgress  className="color-theme" size={36}/>
                    </div>
                }
                {this.state.loadingState && this.state.dataStillLoading && toShow.length ? 
                (<div className="center-hor"><CircularProgress className="color-theme" size={32}/></div>) : ""}
                {/* {!this.state.dataStillLoading && 
                <div className="center-hor">
                <Button onClick={this.handleScroll} 
                className="outline-login-btn bg-white pointer">Load more feed</Button></div>} */}
                {/* {this.state.loadingState && 
                <CircularProgress className=""/>
                } */}
            </div>
        );
	}
}

export default withRouter(ShowFeed);