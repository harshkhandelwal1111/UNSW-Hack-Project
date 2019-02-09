import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Check from '@material-ui/icons/Check'
import RssFeed from '@material-ui/icons/RssFeed'
import Cookie from '../cookie';
import urls from './../urls';

let BASE_URL = urls.API_URL;

class Follower extends Component {
    state = {
        is_following: ''
    }

    componentDidMount() {
        this.setState({
            is_following: this.props.val.user_follows
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            is_following: nextProps.val.user_follows
        })
    }

    follow_from_tab = (uid) => {
        return () => {
            let cookie = Cookie.getCookie('CP');
            axios.post(BASE_URL + `/u/follow/${uid}`, {}, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            })
            this.setState({
                is_following: !this.state.is_following
            })
        }
    }

    render() {
        let def_img = "https://res.cloudinary.com/codepark-in/image/upload/v1540543932/cp-user-avatars/049-robot-8.png";
        let val = this.props.val
        return (
            <Grid item xs={12} sm={6}>
                <Paper className="fol_tab_fol">
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
                                {this.state.is_follows !== '' && <div className="follow_from_follow_tab">
                                    {val.username !== localStorage.getItem('username') && !this.state.is_following &&
                                        <Chip
                                            onClick={this.follow_from_tab(val.uid)}
                                            className="fol_btn"
                                            label="Follow"
                                            variant="outlined"
                                            onDelete={() => { }}
                                            deleteIcon={<RssFeed className="only_theme_color" />} />
                                        || val.username !== localStorage.getItem('username') &&
                                        <Chip
                                            onClick={this.follow_from_tab(val.uid)}
                                            className="following_btn"
                                            label={"Following"}
                                            onDelete={() => { }}
                                            deleteIcon={<Check className="white" />} />}
                                </div>}
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Grid>
        )
    }
}

export default Follower