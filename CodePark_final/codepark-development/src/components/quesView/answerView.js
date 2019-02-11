import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Chip from '@material-ui/core/Chip';
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/styles/hljs";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Edit, Delete, Check, CheckCircle,CheckCircleOutline, FiberManualRecord} from '@material-ui/icons';
import moment from 'moment';
import CustomAceEditor from "./../common/ace";
import Cookie from "./../cookie";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import userimg from "./../../images/common/username.png";
import urls from "../urls";
import Reaction from '../common/reaction';

let BASE_URL = urls.API_URL;

class AnswerView extends Component {
  state = {
    subquestion: "",
    openAnsEdit: false,
    openDeleteDialog: false,
    userUpvoted: false,
    userDownvoted: false,
    nUpvotes: 0,
    nDownvotes: 0,
    answerApproved: false,
    editRespCode: 1,
    editSubmitLoad: false,
    deleteSubmitLoad: false,
    openSnackbar: false,
    msgSnackbar: ""
  };

  openDialog = () => {
    this.setState({ openAnsEdit: true });
  };

  openDeleteDialog = () => {
    this.setState({ openDeleteDialog: true });
  };

  handleClose = () => {
    this.setState({ openAnsEdit: false, openDeleteDialog: false });
  };

  updateAnswer = () => {
    this.setState({ editSubmitLoad: true });
    let data = {
      questionId: this.props.questionId,
      answerId: this.props.answerId,
      answer: this.state.subquestion,
      languageCode: this.props.languageCode,
      language: this.props.languageValue
    };
    data = JSON.stringify(data);
    let cookie = Cookie.getCookie("CP");
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie
      }
    };
    axios
      .post(BASE_URL + "/content/questions/answer/update", data, config)
      .then(
        function(response) {
          let data = response.data;
          this.setState({
            openSnackbar: true,
            msgSnackbar: data.message
          });
          if (data.code === 0) {
            setTimeout(function() {
              window.location.reload();
            }, 2000);
          }
        }.bind(this)
      )
      .catch(
        function(response) {
          this.setState({
            openSnackbar: true,
            msgSnackbar:
              "Could not update your answer. Please check your internet connection and try again."
          });
        }.bind(this)
      );
  };

  deleteAnswer = () => {
    this.setState({ deleteSubmitLoad: true });
    let cookie = Cookie.getCookie("CP");
    let config = { headers: { Authorization: "Bearer " + cookie } };
    axios
      .get(
        BASE_URL +
          `/content/questions/answers/delete/${this.props.questionId}?a=${
            this.props.answerId
          }`,
        config
      )
      .then(
        function(response) {
          let data = response.data;
          if (data.code === 0) {
            setTimeout(function() {
              window.location.reload();
            }, 2000);
          }
          this.setState({ openSnackbar: true, msgSnackbar: data.message });
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState({
            openSnackbar: true,
            msgSnackbar:
              "Could not delete the answer. Please check your internet connection and try again."
          });
        }.bind(this)
      );
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      answerApproved: !prevState.answerApproved
    }));
    let cookie = Cookie.getCookie("CP");
    let config = { headers: { Authorization: "Bearer " + cookie } };
    let url =
      BASE_URL +
      `/content/questions/react/approve?q=${this.props.questionId}&a=${
        this.props.answerId
      }`;
    axios
      .get(url, config)
      .then(function(response) {
        let data = response.data;
        // console.log(data);
        if (data.code === 0) {
          this.setState({ answerApproved: data.approved });
        }
      }.bind(this))
      .catch(function(error) {});
  };

  componentDidMount() {
    this.setState({
      nUpvotes: this.props.nUpvotes,
      nDownvotes: this.props.nDownvotes,
      userUpvoted: this.props.userUpvoted,
      userDownvoted: this.props.userDownvoted,
      subquestion: this.props.answer,
      answerApproved: this.props.answerApproved
    });
  }

  onChange = newValue => {
    this.setState({ subquestion: newValue });
  };

  onClose = () => {
    this.setState({
      openSnackbar: false,
      editSubmitLoad: false,
      deleteSubmitLoad: false
    });
  };

  render() {
    let vertical = "top";
    let horizontal = "center";
    let cookie = Cookie.getCookie('CP');
    // console.log(this.state.answerApproved);
    let {languageValue, answerId, userAnswered} = this.props;
    return (
      <div id={answerId?answerId: ''}>
        <Paper className="each_answer no_bradius">
          {userAnswered ? (
            <div className="center-vert space-between mleft-one">
            {this.state.answerApproved && <CheckCircle className="color-theme" />}
              <Typography
                component="p"
                className="mright-half f-bold color-grey"
              >
                You answered
              </Typography>
              <div className="center-vert">
                <Button onClick={this.openDialog}>
                  <Edit className="color-grey mright-3p" />
                  <Typography component="p" className="pointer text-trans">
                    Edit
                  </Typography>
                </Button>
                <Button onClick={this.openDeleteDialog}>
                  <Delete className="color-grey" />
                  <Typography
                    component="p"
                    className="mright-half pointer text-trans"
                  >
                    Delete
                  </Typography>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-between mleft-one">
              <NavLink
                to={cookie? `/user/${this.props.answeredBy}`: this.props.location.pathname}
                className="center-vert text-decor"
              >
              {this.state.answerApproved && !this.props.userAsked && <CheckCircle className="color-theme" />}
                <Avatar
                  alt={this.props.answeredBy}
                  src={this.props.image ? this.props.image : userimg}
                  className="user-avatar-sm mright-one"
                />
                <Typography component="p" className="f-bold">
                  {this.props.answeredBy}
                </Typography>
                {!!this.props.about && 
                    <p className="mleft-half color-grey-text">{this.props.about.slice(0,20)}
                    {this.props.about.length>20 && '...'}</p>}
                <br></br>
              </NavLink>
              {this.props.userAsked && (
                <div
                  className="pointer"
                  onClick={this.acceptAnswer}
                >
                  {this.state.answerApproved ? (
                    <p className="center-vert color-theme">
                      {/* <Check className="color-theme" /> */}
                      <Chip label="Accepted" color="default" avatar={<Avatar><Check className="color-theme"/></Avatar>} variant="outlined" className="color-theme rightMargin"/>
                    </p>
                  ) : (
                    <p className="center-vert color-grey">
                      {/* <Check className="color-grey" /> */}
                      <Chip label="Accept This Answer" color="default" avatar={<Avatar><Check className="color-grey" /></Avatar>} variant="outlined" className="color-grey rightMargin" />
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          {/* <br /> */}
          <div className="mleft-one">
            <Typography component="p" className="answered_by_part">
            <span className="text_bold_600">{this.props.languageValue}</span>
            <FiberManualRecord className="sep_dot very_little_left" />
            <span className="text_bold_600 very_little_left">{moment(this.props.answerDate, moment.ISO_8601).fromNow()}
            </span>
            </Typography>
            {/*<Typography component="p" className="answered_by_part dash_answered_by color-grey">
              <span className="text_bold_600">{this.props.languageValue}</span> 
              <FiberManualRecord className="sep_dot" />
              <span className="text_bold_600">
              {moment(this.props.answerDate, moment.ISO_8601).fromNow()}
              </span>
            </Typography>*/}
          </div>
          <SyntaxHighlighter
            language={(languageValue==='c' || languageValue==='c_cpp')?'cpp':languageValue}
            style={monokaiSublime}
          >
            {this.props.answer}
          </SyntaxHighlighter>
          {/* <br /> */}
          <div className="mleft-one">
            <Reaction questionId={this.props.questionId}
            answerId = {this.props.answerId} userUpvoted={this.props.userUpvoted} 
            userDownvoted={this.props.userDownvoted} nUpvotes={this.props.nUpvotes} 
            nDownvotes={this.props.nDownvotes} />
          </div>
        </Paper>
        <br />
        <div className="f-width">
          <Dialog
            className="dialog f-width"
            open={this.state.openAnsEdit}
            onClose={this.handleClose}
          >
            <DialogTitle id="responsive-dialog-title">
              {this.props.question}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <CustomAceEditor
                  mode={
                    this.props.languageValue === "cpp"
                      ? "c_cpp"
                      : this.props.languageValue
                  }
                  theme="monokai"
                  name="answer"
                  onLoad={this.onLoad}
                  onChange={this.onChange}
                  value={this.state.subquestion}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                disabled={this.state.editSubmitLoad}
                onClick={this.updateAnswer}
                color="primary"
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="f-width">
          <Dialog
            className="dialog f-width"
            open={this.state.openDeleteDialog}
            onClose={this.handleClose}
          >
            <DialogTitle id="responsive-dialog-title">
              Are you sure you want to delete this answer?
            </DialogTitle>
            <DialogActions className="">
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                disabled={this.state.deleteSubmitLoad}
                onClick={this.deleteAnswer}
                className="color-red"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

export default withRouter(AnswerView);
