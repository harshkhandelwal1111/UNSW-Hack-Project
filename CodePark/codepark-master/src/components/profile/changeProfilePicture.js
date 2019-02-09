import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Check from '@material-ui/icons/Check'
import RssFeed from '@material-ui/icons/RssFeed'
import Create from '@material-ui/icons/Create'
import Cookie from '../cookie';
import urls from './../urls';
import Snackbar from '@material-ui/core/Snackbar';
import PrimarySearchAppBar from '../common/appbar';
import CircularProgress from '@material-ui/core/CircularProgress';

let BASE_URL = urls.API_URL;

class ChangeProfilePicture extends Component{
    state={
        data:'',
        selected:''
    }

    constructor(props){
        super(props)
        this.getData()
    }

    getData=()=>{
        let cookie = Cookie.getCookie('CP');
        axios.request({
            url: BASE_URL + '/u/profile/update/avatar',
            method: "GET",
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            let inf = res.data
            this.setState({
                data: inf.profileImages
            })
        }, (err) => {
        })
    }

    chosen = (e) => {
        let all = document.querySelectorAll('.each_profile_pic')
        all.forEach((val, ind) => {
            val.style.border = ""
        })
        this.setState({
            selected: e.target.src
        })
        e.target.style.border = "solid 5px #1e88e5"
    }

    change_profile_image = () => {
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL+'/u/profile/update/avatar', {
            avatar: this.state.selected
        }, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            }).then((res) => {
                if (res.data.code === 0) {
                    localStorage.setItem('userimg', this.state.selected);
                    window.location.href=`/user/${localStorage.getItem('username')}`
                }
                else {
                    this.setState({
                        edit_wrong_message: res.data.message
                    })
                    this.setState({
                        openSnack: true
                    })
                }
                // this.props.getInfo()
            }).catch(err => {
            })
    }

    render(){
        return(
            <div className="change_profile_picture center_this">
                <PrimarySearchAppBar />
                {/*<Typography component="p" className="change_dp_edit_heading">Edit</Typography>*/}
                <Typography component="p" className="change_dp_heading">Choose your profile picture</Typography>

                {this.state.data && <div id="edit_profile_picture_div">
                        <div>
                            {
                                this.state.data.map((val1,ind)=>(
                                <div>
                                <Typography component="p" className="avatar_category_heading">{val1.category}</Typography>
                                <Grid container spacing={0} alignItems="center" justify="center">
                                    {
                                        val1.avatars.map((val, ind) => (
                                            <Grid item xs={3} sm={3} md={2}>
                                                <img onClick={this.chosen} className="each_profile_pic" src={val} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                </div>
                                ))
                            }
                        </div>
                    <Button className="edit_dp_button" onClick={this.change_profile_image}>Done</Button>
                    <Typography onClick={() => { window.location.href = `/user/${localStorage.getItem('username')}` } } component="p" className="dp_edit_cancel">Cancel</Typography>
                </div>}
                {!this.state.data && <CircularProgress className="only_theme_color margin_40_up" size={32} />}
            </div>
        )
    }
}

export default ChangeProfilePicture

