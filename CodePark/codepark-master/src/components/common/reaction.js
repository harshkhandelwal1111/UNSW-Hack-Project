import React, { Component } from 'react';
import {Snackbar} from '@material-ui/core';
import KeyBoardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyBoardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import axios from 'axios';
import Cookie from '../cookie';
import urls from '../urls';

const BASE_URL = urls.API_URL;

class Reaction extends Component {
    state = {
        nUpvotes: this.props.nUpvotes,
        nDownvotes: this.props.nDownvotes,
        userUpvoted: this.props.userUpvoted,
        userDownvoted: this.props.userDownvoted,
        vertical: 'top',
        horizontal: 'center',
        openSnackbar: false,
        msgSnackbar: ''
    }

    componentDidMount() {
        this.setState({
            nUpvotes: this.props.nUpvotes,
            nDownvotes: this.props.nDownvotes,
            userUpvoted: this.props.userUpvoted,
            userDownvoted: this.props.userDownvoted
        })
    }

    onClose = () => {
        this.setState({openSnackbar: false});
    }

    upvote = () => {
        let cookie = Cookie.getCookie("CP");
        let config = { headers: { Authorization: "Bearer " + cookie } };
        let url = `${BASE_URL}/content/questions/react/upvote?q=${
            this.props.questionId}&a=${this.props.answerId}`;
        axios.get(url, config);
        // console.log(url);
        if(!cookie) {
            this.setState({
                openSnackbar: true,
                msgSnackbar: 'You are not logged in!! Please login to continue.'
            })
        }
        else {
            if (this.state.userUpvoted) {
                this.setState({
                    nUpvotes: this.state.nUpvotes-1,
                    userUpvoted: false
                });
            }
            else {
                this.setState({
                    nUpvotes: this.state.nUpvotes+1,
                    userUpvoted: true
                });
                if(this.state.userDownvoted) {
                    this.setState({userDownvoted: false,
                        nDownvotes: this.state.nDownvotes-1
                    });
                }
            }
        }
    }

    downvote = () => {
        let cookie = Cookie.getCookie("CP");
        let config = { headers: { Authorization: "Bearer " + cookie } };
        let url = `${BASE_URL}/content/questions/react/downvote?q=${
            this.props.questionId}&a=${this.props.answerId}`;
        axios.get(url, config);
        if(!cookie) {
            this.setState({
                openSnackbar: true,
                msgSnackbar: 'You are not logged in!! Please login to continue.'
            })
        }
        else {
            if (this.state.userDownvoted) {
                this.setState({
                    nDownvotes: this.state.nDownvotes-1,
                    userDownvoted: false
                });
            }
            else {
                this.setState({
                    nDownvotes: this.state.nDownvotes+1,
                    userDownvoted: true
                });
                if(this.state.userUpvoted) {
                    this.setState({userUpvoted: false,
                    nUpvotes: this.state.nUpvotes-1});
                }
            }
        }
    }

    render() {
        // console.log(this.state);
        const {vertical, horizontal} = this.state;
        return (
            <div className="center-vert">
            {this.state.userUpvoted ? (
              <div
                className="pointer center-vert color-blue"
                onClick={this.upvote}
              >
                <KeyBoardArrowUp className="" />
                <p className="mright-half">Upvoted</p>
              </div>
            ) : (
              <div className="pointer center-vert" onClick={this.upvote}>
                <KeyBoardArrowUp className="" />
                <p className="color-dark-grey mright-half">Upvote</p>
              </div>
            )}
            <p className="mright-one">{`| ${this.state.nUpvotes}`}</p>
            {this.state.userDownvoted ? (
              <div
                className="pointer center-vert color-blue"
                onClick={this.downvote}
              >
                <KeyBoardArrowDown className="" />
                <p className="mright-half">Downvoted</p>
              </div>
            ) : (
              <div className="pointer center-vert" onClick={this.downvote}>
                <KeyBoardArrowDown className="pointer" />
                <p className="color-dark-grey pointer mright-half">
                  Downvote
                </p>
              </div>
            )}
            <p className="mright-one">{`|  ${this.state.nDownvotes}`}</p>
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

export default Reaction;