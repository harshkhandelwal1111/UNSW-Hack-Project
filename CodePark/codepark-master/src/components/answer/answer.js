import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
// import {withRouter} from 'react-router-dom';
import PrimarySearchAppBar from "../common/appbar";
import QuesInfo from "./quesInfo";
import CustomAceEditor from "../common/ace";
import Cookie from "./../cookie";
import urls from "../urls";
import { NavLink } from "react-router-dom";
import Tag from '../profile/tag';

let BASE_URL = urls.API_URL;

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      subquestion: "",
      tags: [],
      answer: "",
      // answers: [],
      // question: '',
      // user: '',
      // found: '',
      respCode: 1,
      language: "c",
      editorLanguage: "c_cpp",
      openSnackbar: false,
      msgSnackbar: "",
      loading: false,
      fetching: true
    };
    this.getQuesDetail();
  }
  componentDidMount() {
    document.title = "Write an answer | CodePark";
  }
  handleChange = name => event => {
    let value = event.target.value;
    let editorValue = value;
    if (editorValue === "c" || editorValue === "cpp") {
      editorValue = "c_cpp";
    }
    if (name === "language") {
      this.setState({ editorLanguage: editorValue });
    }
    this.setState({
      [name]: value
    });
  };

  handleDelete = () => {};

  getQuesDetail = () => {
    let cookie = Cookie.getCookie("CP");
    let config = { headers: { Authorization: "Bearer " + cookie } };
    //   console.log(this.props.params);
    axios
      .get(
        BASE_URL + `/content/questions/details/${this.props.match.params.qid}`,
        config
      )
      .then(
        function(response) {
          let data = response.data;
          // console.log(data);
          document.title = `Answer - "`+ data.questionData.question + `" | CodePark`;
          this.setState({ question: data.questionData, found: data.userFound, fetching:false });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.answer !== nextState.answer) {
      return false;
    } else {
      return true;
    }
  }
  onChange = newValue => {
    this.setState({ answer: newValue });
  };

  onClose = () => {
    this.setState({ openSnackbar: false, loading: false });
    if (this.state.respCode === 0) {
      this.props.history.push(`/question/view/${this.state.question.qname}/${this.props.match.params.qid}`);
    }
  };

  postData = () => {
    this.setState({ loading: true });
    let qid = this.props.match.params.qid;
    let answer = this.state.answer;
    let language = this.state.language;
    // if (language === "c" || language === "cpp") {
      // language = "c_cpp";
    // }
    let cookie = Cookie.getCookie("CP");
    let data = { questionId: qid, answer: answer, language: language };
    data = JSON.stringify(data);
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie
      }
    };
    axios
      .post(BASE_URL + "/content/questions/answer", data, config)
      .then(
        function(response) {
          let data = response.data;
          // if(data.code === 0) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: data.message,
            respCode: data.code
          });
          // }
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: "Could not add your answer. Please check your internet connection and try again."
          });
        }.bind(this)
      );
  };

  render() {
    let question = this.state.question;
    let found = this.state.found;
    let vertical = "top";
    let horizontal = "center";
    let tags = question.tags;
    // console.log('qeqsdad', question);
    // console.log(question.askedBy_profileImage)
    return (
      <div className="bg-grey">
        <PrimarySearchAppBar />
        <br />
        <br />
        <div className="question">
          <Grid container spacing={24}>
            <Grid item lg={3} sm={false} className="hide-sm" />
            <Grid item lg={6} sm={8} xs={12}>
              <Paper className="question-paper">
                {!this.state.fetching?
                <div>
                <NavLink
                  to={`/question/view/${question.qname}/${this.props.match.params.qid}`}
                  className="text-decor color-grey"
                >
                  <Typography variant="title">{question.question}</Typography>
                </NavLink>
                <br />
                <p dangerouslySetInnerHTML={{__html: question.questionDetail}} />
                <div className="tags_part_dash">
                  {tags && tags[0] !== "" &&
                    tags.map((val, ind) => (
                      <Tag tag_name={val} />
                    ))
                  }
                </div></div>:
                <div className="c-align mtop-two">
                  <CircularProgress className="color-theme" size={32}/>
                </div>
                }
                <br />
                <Select
                  id="language"
                  value={this.state.language}
                  onChange={this.handleChange("language")}
                  className="horiz-right"
                  inputProps={{
                    name: "age",
                    id: "language"
                  }}
                >
                  <MenuItem value="c">C</MenuItem>
                  <MenuItem value="cpp">C++</MenuItem>
                  <MenuItem value="csharp">CSharp</MenuItem>
                  <MenuItem value="css">CSS</MenuItem>
                  <MenuItem value="golang">Golang</MenuItem>
                  <MenuItem value="haskell">Haskell</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="javascript">JavaScript</MenuItem>
                  <MenuItem value="kotlin">Kotlin</MenuItem>
                  <MenuItem value="matlab">Matlab</MenuItem>
                  <MenuItem value="php">PHP</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="r">R</MenuItem>
                  <MenuItem value="ruby">Ruby</MenuItem>
                  <MenuItem value="sql">SQL</MenuItem>
                </Select>
                <div className="ace-editor">
                  <CustomAceEditor
                    mode={this.state.editorLanguage}
                    theme="monokai"
                    name="answer"
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <br />
                <div className="c-align">
                  {this.state.loading ? (
                    <div className="center-vert center-hor">
                      <Button
                        disabled={this.state.loading}
                        type="submit"
                        size="medium"
                        className="pos-absolute text-trans"
                      >
                        Submit
                      </Button>
                      <CircularProgress className="color-theme" size={32} />
                    </div>
                  ) : (
                    <Button
                      size="medium"
                      className="signup-form-btn text-trans"
                      onClick={this.postData}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid item lg={3} sm={3} className="hide-sm">
              {found && (
                <QuesInfo
                  views={question.views}
                  askedBy={question.askedBy.username}
                  about={question.askedBy.about}
                  image={question.askedBy.profile_image}
                  userId={question.askedBy.uid}
                  nFollows={question.no_of_followers}
                  userAsked={question.user_asked}
                  userFollows={question.user_follows_question}
                  date={question.posted_on}
                  no_of_followers={question.askedBy.no_of_followers}
                  user_follows={question.askedBy.user_follows}
                />
              )}
            </Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={3000}
          onClose={this.onClose}
          // onRequestClose={() => {
          //   this.setState({ openSnackbar: false });
          // }}
        />
      </div>
    );
  }
}

export default Answer;
