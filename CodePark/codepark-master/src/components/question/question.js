import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
// import CustomFroalaEditor from "./../common/froala";
import CustomQuill from './../common/quill';
import axios from "axios";
import PrimarySearchAppBar from "../common/appbar";
import Rules from "./rules";
import Cookie from "../cookie";
import urls from "../urls";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';

let BASE_URL = urls.API_URL;

class Question extends Component {

  constructor() {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);
    this.state = {
      question: "",
      subquestion: "",
      tags: "",
      input: "",
      output: "",
      questionModel: "",
      checkBox: false,
      openSnackbar: false,
      msgSnackbar: "",
      loading: false,
      qid:'',
      qname:'',
      deleteCode: 1,
      // model: 'Example'
    };
  }

  handleModelChange = (subquestion) => {
    this.setState({
      subquestion: subquestion
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleChecked = name => event => {
    this.setState({
      [name]: event.target.checked
    });
    // console.log(this.state.checkBox);
  };
  postData = () => {
    let question = this.state.question;
    let subquestion = this.state.subquestion;
    let tags = this.state.tags;
    let input = this.state.input;
    let output = this.state.output;
    let testcase = {
      input: input,
      output: output
    };
    let data = {
      question: question,
      subquestion: subquestion,
      tag: tags,
      testcase: testcase
    };
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
      .post(BASE_URL + "/content/questions/add", data, config)
      .then(
        function(response) {
          let data = response.data;
          // console.log(data);
          this.setState({ openSnackbar: true, msgSnackbar: data.message, qid: data.qid, qname: data.qname, loading: false });
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: "Could not add your answer. Please try again.",
            loading: false
          });
        }.bind(this)
      );
    //   console.log(this.state.subquestion);
  };

  onClose = () => {
    this.setState({ openSnackbar: false, loading: false });
    if(this.state.qid) {
      this.props.history.push(`/question/view/${this.state.qname}/${this.state.qid}`);
    }
  };

  render() {
    let vertical = "top";
    let horizontal = "center";
    return (
      <div className="bg-grey">
        <PrimarySearchAppBar />
        <br />
        <br />
        <div className="question">
          <Grid container spacing={24}>
            <Grid item lg={4} sm={4} className="hide-sm">
              <Rules className="" />
            </Grid>
            <Grid item lg={8} sm={8} xs={12}>
              <Paper className="question-paper">
                <Typography variant="title">Ask your question</Typography>
                <br />
                <TextField
                  id="question"
                  label="Question title"
                  className="full-width"
                  value={this.props.value}
                  onChange={this.handleChange("question")}
                  margin="normal"
                  variant="outlined"
                />
                <br />
                <br />
                {/* <CustomFroalaEditor
                  tag="solution-editor"
                  model={this.state.subquestion}
                  onModelChange={model => this.setState({ subquestion: model })}
                  onModelChange={this.handleModelChange}
                /> */}
                <CustomQuill
                value={this.state.subquestion}
                // className="editor"
                onModelChange={value => 
                this.setState({ subquestion: value })} />
                <br />
                <br />
                <TextField
                  id=""
                  label="Tags (Minimum 3)"
                  className="full-width"
                  value={this.state.name}
                  onChange={this.handleChange("tags")}
                  margin="normal"
                  variant="outlined"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkBox}
                      onChange={this.handleChecked("checkBox")}
                      value="checkBox"
                      className="check-box"
                    />
                  }
                  label="Add Testcases"
                />
                {this.state.checkBox && (
                  <Grid container spacing={24}>
                    <Grid item lg={6} sm={6} xs={12}>
                      <TextField
                        id="input"
                        label="Input"
                        multiline
                        rows="10"
                        className="full-width"
                        onChange={this.handleChange("input")}
                        margin="normal"
                        variant="outlined"
                      />
                      <br />
                      <br />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                      <TextField
                        id="output"
                        label="Output"
                        multiline
                        rows="10"
                        className="full-width"
                        onChange={this.handleChange("output")}
                        margin="normal"
                        variant="outlined"
                      />
                      <br />
                      <br />
                    </Grid>
                  </Grid>
                )}
                <br />
                <br />
                {/* <div className="c-align">
                  <Button
                    size="medium"
                    className="signup-form-btn text-trans"
                    onClick={this.postData}
                  >
                    Submit
                  </Button>
                </div> */}
                <div className="c-align">
              {!this.state.loading &&
				    		<Button size="medium" 
                className="signup-form-btn text-trans pos-absolute"
                onClick={this.postData}>Submit</Button>
				    	}
				    	{this.state.loading &&
				    		<div className="center-vert center-hor">
			    				<Button disabled={this.state.loading} size="medium" 
			    				className="pos-absolute text-trans">Submit</Button>
			    				<CircularProgress className="color-theme" size={32}/>
			    			</div>
              }
              </div>
              </Paper>
            </Grid>
            <br />
            <Grid item xs={12} className="show-sm">
              <Rules />
            </Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={4000}
          onClose={this.onClose}
          // onRequestClose={() => {
          //   this.setState({ openSnackbar: false });
          // }}
        />
      </div>
    );
  }
}

export default Question;
