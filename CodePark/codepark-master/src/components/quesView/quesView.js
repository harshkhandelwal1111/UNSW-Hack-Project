import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import CircularProgress from '@material-ui/core/CircularProgress';
import QuesInfo from "../answer/quesInfo";
// import PrimarySearchAppBar from "../common/appbar";
import Navbar from '../static/navbar';
import axios from "axios";
import urls from "../urls";
import Cookie from "../cookie";
import AnswerView from "./answerView";
// import QuesEdit from './quesEdit';
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RssFeed from "@material-ui/icons/RssFeed";
import Share from "@material-ui/icons/Share";
// import CustomFroalaEditor from "./../common/froala";
import CustomQuill from '../common/quill';
import { NavLink } from "react-router-dom";
import Tag from './../profile/tag';
import { IconButton, Avatar } from "@material-ui/core";
import userimg from './../../images/common/username.png';
import FooterBar from "../common/footerBar";

let BASE_URL = urls.API_URL;

class QuesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: "",
      found: false,
      userFollowsQues: false,
      nFollowers: 0,
      quesGetCode: 3,
      quesGetMsg: '',
      subquestionEdit: "",
      quesTags:[],
      questionEdit: "",
      openQuesEdit: false,
      openQuesDelete: false,
      openSnackbar: false,
      msgSnackbar: "",
      loading: false,
      fetching: true
    };
    this.getDetails();
  }

  getDetails = () => {
    let cookie = Cookie.getCookie("CP");
    let config = { headers: { Authorization: "Bearer " + cookie } };
    // this.setState({fetching: true});
    axios
      .get(
        BASE_URL + `/content/questions/details/${this.props.match.params.qid}`,
        cookie?config:''
      )
      .then(
        function(response) {
          let data = response.data;
          // console.log(data)
          // this.setState({questionEdit: question.questionTitle, subquestionEdit: question.subQuestion,
          // tags: tags});
          this.setState({quesGetCode: data.code});
          if (data && data.code === 0) {
            let question = data.questionData;
            /**
             * Meta data is required for SEO
             * -----------------------------
             */
            let metaData = {
              title : `${question.question} | CodePark`,
              description : `${question.question} ${question.questionDetail.slice(0,100)}`,
              url : `https://codepark.in/question/view/${question.qname}/${question.uid}`,
              keywords : `${question.tags.join(',')},codepark,competitive programming,interview preparation,interview questions`
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
              questionData: question,
              found: data.userFound,
              userFollowsQues: question.user_follows_question,
              nFollowers: question.no_of_followers,
              questionEdit: question.question,
              subquestionEdit: question.questionDetail,
              quesTags: question.tags.join(','),
              fetching: false
            });
          }
          else if(data.code === 1) {
            this.setState({quesGetMsg: data.message, fetching: false});
          }
        }.bind(this)
      )
      .catch(function(error) {
      });
  };

  followQues = () => {
    let cookie = Cookie.getCookie("CP");
    let config = { headers: { Authorization: "Bearer " + cookie } };
    axios
      .post(
        `${BASE_URL}/content/questions/follow/${this.props.match.params.qid}`,
        {},
        config
      )
      .then(
        function(response) {
          let data = response.data;
          if (data.code === 0) {
            this.setState({
              userFollowsQues: data.follower,
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

  quesEdit = () => {
    this.setState({ openQuesEdit: true });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({ openQuesEdit: false, openQuesDelete: false });
  };

  onChange = newValue => {
    this.setState({ answer: newValue });
  };

  onClose = () => {
    this.setState({ openSnackbar: false });
  };

  updateQues = () => {
    let question = this.state.questionEdit;
    let subquestion = this.state.subquestionEdit;
    let tags = this.state.quesTags;
    // console.log(this.state.questionData);
    // let input = "";
    // let output = this.state.output;
    // let testcase = {
    //   input: input,
    //   output: output
    // };
    let data = {
      uid: this.state.questionData.uid,
      question: question,
      subquestion: subquestion,
      tag: tags,
      // testcase: testcase
    };
    // console.log(data);
    data = JSON.stringify(data);
    let cookie = Cookie.getCookie("CP");
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie
      }
    };
    this.setState({loading: true});
    axios
      .post(BASE_URL + "/content/questions/update", data, config)
      .then(
        function(response) {
          let data = response.data;
          this.setState({ openSnackbar: true, msgSnackbar: data.message, loading:  false });
          if(data.code===0) {
            setTimeout(function(){ window.location.reload() }, 2000);
          }
        }.bind(this)
      )
      .catch(
        function() {
          // console.log(error);
          this.setState({
            openSnackbar: true,
            msgSnackbar: "Could not update. Please try again.",
            loading: false
          });
        }.bind(this)
      );
  };

  deleteQues = () => {
    let cookie = Cookie.getCookie("CP");
    let config = { headers: { Authorization: "Bearer " + cookie } };
    this.setState({loading: true});
    axios
      .get(
        BASE_URL + `/content/questions/delete/${this.props.match.params.qid}`,
        config
      )
      .then(
        function(response) {
          let data = response.data;
          if(data.code===0) {
            setTimeout(() => { this.props.history.push('/dashboard') }, 3000);
          }
          this.setState({ openSnackbar: true, msgSnackbar: data.message, loading: false });
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState({
            openSnackbar: true,
            msgSnackbar:
              "Could not delete. Please check your internet connection and retry.",
            loading: false
          });
        }.bind(this)
      );
  };

  answer = () => {
    if(Cookie.getCookie('CP')) {
      this.props.history.push(`/answer/${this.props.match.params.qid}`);
    }
    else {
      localStorage.setItem('path', window.location.pathname);
      this.props.history.push('/login');
    }
  }

  is_screen_small=()=>{
    if(window.screen.width<=600){
      return true
    }
    else{
      return false
    }
  }

  share=()=>{
    if (navigator.share) {
      navigator.share({
        title: 'CodePark',
        text: 'Hey! Check out this awesome question on CodePark!',
        url: `${window.location.href}`
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  render() {
    // console.log(this.state.fetching);
    let vertical = "top";
    let horizontal = "center";
    let questionData = this.state.questionData;
    let qname=questionData.qname
    let question = questionData.question;
    let subquestion = questionData.questionDetail;
    let answers = questionData.answers;
    let tags = questionData.tags;
    let userAsked = questionData.user_asked;
    let userAnswered = questionData.user_answered;
    let userFollowsQues = this.state.userFollowsQues;
    let answerView = [];
    if (answers) {
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        // console.log(answer);
        let languageCode = answer.language.code;
        if (!languageCode) {
          languageCode = "2";
        }
        answerView.push(
          <div>
            <AnswerView
              answerId={answer.uid}
              questionId={this.props.match.params.qid}
              answer={answer.answer}
              answeredBy={answer.answeredBy.username}
              userid={answer.answeredBy.uid}
              answerApproved={answer.approved}
              question={question}
              qname={qname}
              subquestion={subquestion}
              languageCode={languageCode}
              languageValue={answer.language.value}
              image={answer.answeredBy.profile_image}
              nUpvotes={answer.upvotes}
              nDownvotes={answer.downvotes}
              userUpvoted={answer.user_upvoted}
              userDownvoted={answer.user_downvoted}
              userAsked={userAsked}
              answerDate={answer.posted_on}
              about={answer.answeredBy.about}
              userAnswered={answer.user_answered}
              history={this.props.history}
            />
          </div>
        );
      }
    }
    return (
      <div className="bg-grey">
        <Navbar />
        <div className="question center-hor">
        {this.state.quesGetCode===0 && !this.state.fetching &&
        <Grid container spacing={24} className="">
            <Grid item lg={2} className="hide-sm" />
            <Grid item lg={6} md={8} sm={12} xs={12}>
            
            <Paper className="question-paper">
                <Typography variant="title" className="f-bold">
                  {question}
                </Typography>
                <br />
                <Typography component="p">
                  <p dangerouslySetInnerHTML={{ __html: subquestion }} />
                </Typography>
                <div className="tags_part_dash">
                  {tags && tags[0] !== "" &&
                    tags.map((val, ind) => (
                      <Tag tag_name={val} />
                    ))
                  }
                </div>
                <br />
                {userAsked ? (
                  <div className="center-vert">
                    <Button onClick={this.quesEdit}
                    className="answer-btn mright-half">
                      <Edit className="color-grey" />
                      <Typography
                        component="p"
                        className="mright-half pointer text-trans"
                      >
                        Edit
                      </Typography>
                    </Button>
                    <Button className="answer-btn" onClick={ () => this.setState({openQuesDelete: true})}>
                      <Delete className="color-grey" />
                      <Typography
                        component="p"
                        className="mright-half pointer text-trans"
                      >
                        Delete
                      </Typography>
                    </Button>
                  </div>
                ) : (
                  <div className="center-vert">
                    {!userAnswered && (
                      <Button className="answer-btn center-vert text-decor color-grey" onClick={this.answer}>
                        <Edit className="color-grey" />
                        <Typography
                          component="p"
                          className="mright-half pointer text-trans color-grey"
                        >
                          Answer
                        </Typography>
                      </Button>
                    )}
                    {userFollowsQues ? (
                      <Button
                        className="answer-btn center-vert text-decor mleft-half color-blue"
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
                        className="answer-btn center-vert text-decor mleft-half color-grey"
                        onClick={this.followQues}
                      >
                        <RssFeed />
                        <Typography
                          component="p"
                          className="mright-half pointer text-trans color-grey"
                        >
                          Follow | {this.state.nFollowers}
                        </Typography>
                      </Button>
                    )}
                    {this.is_screen_small() && (
                      <IconButton className="share-btn" onClick={this.share}>
                        <Share className="color-white" />
                      </IconButton>
                    )}
                  </div>
                )}
              </Paper>
              {!userAsked && !userAnswered &&
              <Paper className="mtop-half mbot-half c-align paper">
                  <Avatar alt={localStorage.getItem('username')}
					        	src={localStorage.getItem('userimg')? localStorage.getItem('userimg'):userimg}
					        	className="marg-auto" />
                  {Cookie.getCookie('CP')?
                    <p>
                      {
                      localStorage.getItem('fullName')?localStorage.getItem('fullName').split(' ')[0]:
                      localStorage.getItem('username')}, can you answer this question?
                    </p>:
                    <p>Can you answer this question?</p>
                  }
                  <p className="color-grey-text">People are searching for a better algorithm to this problem.</p>
                  <Button className="write-answer-btn"
                  onClick={this.answer}>
                  Write an Answer</Button>
              </Paper>}
               <br/>
              {this.state.quesGetCode===0 && answerView}
            </Grid>
            <Grid item lg={2} md={3} className="hide-smr">
              {questionData && (
                <QuesInfo
                  views={questionData.views}
                  askedBy={questionData.askedBy.username}
                  about={questionData.askedBy.about}
                  no_of_followers={questionData.askedBy.no_of_followers}
                  user_follows={questionData.askedBy.user_follows}
                  image={questionData.askedBy.profile_image}
                  userId={questionData.askedBy.uid}
                  nFollows={this.state.nFollowers}
                  userAsked={userAsked}
                  userFollows={userFollowsQues}
                  date={questionData.posted_on}
                  getDetails={this.getDetails}
                />
              )}
            </Grid>
          </Grid>}
          {this.state.quesGetCode===1 &&
          <Grid container>
          <Grid item lg={3} md={3} sm={2} className="hide-xs"></Grid>
          <Grid item lg={6} md={6} sm={8} xs={12}>
          <Paper className="paper not-found-paper">
            <h1 className="">404</h1>
            <p className="mtop-one">{this.state.quesGetMsg}</p>
            <NavLink to='/dashboard' className="navlink-text">
            <p className="mtop-one">Go back to dashboard</p>
            </NavLink>
          </Paper>
          </Grid>
          <Grid item lg={3} md={3} sm={2} className="hide-xs"></Grid>
          </Grid>
          }
        </div>
        {this.state.fetching && 
        <CircularProgress size={32} className="color-theme center_of_page"/>}
        <div id="question-editor-div">
          <Dialog
            className="dialog"
            open={this.state.openQuesEdit}
            onClose={this.handleClose}
          >
            <DialogTitle id="responsive-dialog-title">
              <TextField
                id="question"
                label="Question title"
                className="full-width"
                value={this.state.questionEdit}
                onChange={this.handleChange("questionEdit")}
                margin="normal"
                variant="outlined"
              />
              <br />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* <CustomFroalaEditor
                  tag="solution-editor"
                  model={this.state.subquestionEdit}
                  onModelChange={model =>
                    this.setState({ subquestionEdit: model })
                  }
                /> */}
                <CustomQuill
                value={this.state.subquestionEdit}
                onModelChange={model => 
                this.setState({ subquestionEdit: model })} />
                <br/>
                <TextField
                  id=""
                  label="Tags (Minimum 3)"
                  className="full-width mtop-three"
                  value={this.state.quesTags}
                  onChange={this.handleChange("quesTags")}
                  margin="normal"
                  variant="outlined"
                />

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              {/* <Button onClick={this.updateQues} color="primary" autoFocus>
                Update
              </Button> */}
              {!this.state.loading ? 
            <Button onClick={this.updateQues} className="color-theme" autoFocus>
              Update
            </Button>:
            <div className="center-vert">
              <Button disabled onClick={this.deleteQues} className="pos-fixed" autoFocus>
                Update
              </Button>
              <CircularProgress className="color-theme" size={32}/>
            </div>
            }
            </DialogActions>
          </Dialog>
        </div>

      <div>
        <Dialog
          className="question-delete dialog"
          open={this.state.openQuesDelete}
          onClose={this.handleClose}
        >
        <DialogContent>
        <DialogTitle>
          Are you sure you want to delete this question?
          </DialogTitle>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {!this.state.loading ? 
            <Button onClick={this.deleteQues} className="color-red" autoFocus>
              Delete
            </Button>:
            <div className="center-vert">
              <Button disabled onClick={this.deleteQues} className="pos-fixed" autoFocus>
                Delete
              </Button>
              <CircularProgress className="color-red" size={32}/>
            </div>
            }
          </DialogActions>
        </Dialog>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={this.state.openSnackbar}
        message={this.state.msgSnackbar}
        autoHideDuration={4000}
        onClose={this.onClose}
      />
      <FooterBar/>
      </div>
    );
  }
}

export default QuesView;
