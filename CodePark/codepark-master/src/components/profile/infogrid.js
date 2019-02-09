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

let BASE_URL = urls.API_URL;

class InfoGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: this.props.allData.user_already_follows,
            no_of_followers: this.props.allData.no_of_followers,
            open1: false,
            new_firstName: '',
            new_lastName: '',
            new_about: '',
            open2: false,
            profile_images: '',
            selected: '',
            open3: false,
            openSnack:false,
            edit_wrong_message:'',
            vertical:'top',
            horizontal:'center'
        }
    }

    componentDidMount() {
        this.setState({
            follow: this.props.allData.user_already_follows,
            no_of_followers: this.props.allData.no_of_followers,
            new_firstName: this.props.name.firstName,
            new_lastName: this.props.name.lastName,
            new_about: this.props.allData.about
        })
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.value !== this.props.value) {
        // 	this.setState({ count: nextProps.value });
        // }
        this.setState({
            follow: nextProps.allData.user_already_follows,
            no_of_followers: nextProps.allData.no_of_followers,
            new_firstName: nextProps.name.firstName,
            new_lastName: nextProps.name.lastName,
            new_about: this.props.allData.about
        })
    }

    follow_click1 = (e) => {
        if(this.state.follow){
            this.setState({
                follow:false,
                no_of_followers:this.state.no_of_followers-1
            })
        }
        else{
            this.setState({
                follow: true,
                no_of_followers: this.state.no_of_followers + 1
            })
        }
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL + `/u/follow/${this.props.allData.uid}`, {}, {
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            this.props.getInfo()
        })
    }

    follow_click2 = (e) => {
        if (this.state.follow) {
            this.setState({
                follow: false,
                no_of_followers: this.state.no_of_followers - 1
            })
        }
        else {
            this.setState({
                follow: true,
                no_of_followers: this.state.no_of_followers + 1
            })
        }
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL + `/u/follow/${this.props.allData.uid}`, {}, {
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            this.props.getInfo()
        })
    }

    handleOpen1 = () => {
        this.setState({ open1: true });
    };

    handleClose1 = () => {
        this.setState({ open1: false });
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    change_name = () => {
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL + '/u/profile/update/name', {
            firstName: this.state.new_firstName,
            lastName: this.state.new_lastName
        }, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            }).then((res) => {
                this.handleClose1()
                if(res.data.code===0){
                    this.props.getInfo()
                }
                else{
                    this.setState({
                        edit_wrong_message:res.data.message
                    })
                    this.setState({
                        openSnack:true
                    })
                }
            }).catch(err => {
            })
    }

    handleOpen2 = () => {
        this.get_avatars()
        this.setState({ open2: true });
    };

    handleClose2 = () => {
        this.setState({ open2: false });
    };

    get_avatars = () => {
        let cookie = Cookie.getCookie('CP');
        axios.request({
            url: BASE_URL+'/u/firstLogin',
            method: "GET",
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            let inf = res.data
            this.setState({
                profile_images: inf.profileImages
            })
        }, (err) => {
        })
    }

    chosen = (e) => {
        let all = document.querySelectorAll('.edit_avatar_each')
        all.forEach((val, ind) => {
            val.children[0].style.background = "white"
        })
        this.setState({
            selected: e.target.src
        })
        e.target.style.background = "#eee"
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
                this.handleClose2()
                if (res.data.code === 0) {
                    localStorage.setItem('userimg', this.state.selected);
                    window.location.reload();
                }
                else{
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

    change_about = () => {
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL + '/u/profile/update/about', {
            about: this.state.new_about
        }, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            }).then((res) => {
                this.handleClose3()
                if(res.data.code===0){
                    this.props.getInfo()
                }
                else{
                    this.setState({
                        edit_wrong_message: res.data.message
                    })
                    this.setState({
                        openSnack: true
                    })
                }
            }).catch(err => {
            })
    }

    handleOpen3 = () => {
        this.setState({ open3: true });
    };

    handleClose3 = () => {
        this.setState({ open3: false });
    };

    handleCloseSnack = () => {
        this.setState({ openSnack: false });
    };

    render() {
        const { vertical, horizontal, openSnack } = this.state;
        let src_img = (this.props.profile_image) ? this.props.profile_image : "https://res.cloudinary.com/codepark-in/image/upload/v1540543932/cp-user-avatars/049-robot-8.png";
        return (
            <div id="intro">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={openSnack}
                    onClose={this.handleCloseSnack}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.edit_wrong_message}</span>}
                />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open1}
                    onClose={this.handleClose1}
                    className="modal_edit_name"
                >
                    <Paper className="paper">
                        <div id="edit_name_div">
                            <Typography variant="headline" component="h2" className="no_space_heading">Edit</Typography>
                            <Typography variant="headline" component="h2" className="theme_color no_space_heading">Name</Typography>
                            <TextField
                                required
                                id="standard-required"
                                label="First Name"
                                defaultValue={this.props.allData.name.firstName}
                                margin="normal"
                                onChange={this.handleChange('new_firstName')}
                                fullWidth
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Last Name"
                                defaultValue={this.props.allData.name.lastName}
                                margin="normal"
                                onChange={this.handleChange('new_lastName')}
                                fullWidth
                            />
                        </div>
                        <Button className="edit_buttons" onClick={this.change_name}>Done</Button><Button className="edit_buttons little_left" onClick={this.handleClose1}>Cancel</Button>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open2}
                    onClose={this.handleClose2}
                    className="modal_edit_dp"
                >
                    <Paper className="paper">
                        <div id="edit_dp_div">
                            <Typography variant="headline" component="h2" className="no_space_heading">Edit</Typography>
                            <Typography variant="headline" component="h2" className="theme_color no_space_heading">Profile Image</Typography>
                            {this.state.profile_images &&
                                <div>
                                    <Grid container spacing={0}>
                                        {
                                            this.state.profile_images.map((val, ind) => (
                                                <Grid item xs={3} sm={4} md={2}>
                                                    <Avatar onClick={this.chosen} className="edit_avatar_each" src={val} />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </div>}
                            <Button className="edit_buttons" onClick={this.change_profile_image}>Done</Button><Button className="edit_buttons little_left" onClick={this.handleClose2}>Cancel</Button>
                        </div>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open3}
                    onClose={this.handleClose3}
                    className="modal_edit_about"
                >
                    <Paper className="paper">
                        <div id="edit_about_div">
                            <Typography variant="headline" component="h2" className="no_space_heading">Edit</Typography>
                            <Typography variant="headline" component="h2" className="theme_color no_space_heading">About</Typography>
                            <TextField
                                required
                                id="standard-required"
                                label="About"
                                defaultValue={this.props.allData.about}
                                margin="normal"
                                onChange={this.handleChange('new_about')}
                                fullWidth
                                multiline
                                rowsMax="4"
                            />
                        </div>
                        <Button className="edit_buttons" onClick={this.change_about}>Done</Button><Button className="edit_buttons little_left" onClick={this.handleClose3}>Cancel</Button>
                    </Paper>
                </Modal>
                <Paper className="paper" elevation={1}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={3}>
                            <img id="dp" alt="Username"
                                src={src_img}
                                className="pic" />
                            {this.props.personal && <Create className="change_profile grey_text" onClick={()=>{ window.location.href=`/user/${localStorage.getItem('username')}/changeProfilePicture` }} />}
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant="headline" component="h1" id="name" className="no_space_heading">{this.props.name.firstName} {this.props.name.lastName}</Typography>{this.props.allData.personal && <Create className="change_profile grey_text little_left" onClick={this.handleOpen1} />}
                            {this.props.admin && <Chip
                                className="admod"
                                color='primary'
                                avatar={<Avatar>AD</Avatar>}
                                label="Administrator"
                            />}
                            {this.props.mode && <Chip
                                color='primary'
                                className="admod"
                                avatar={<Avatar>MD</Avatar>}
                                label="Moderator"
                            />}
                            <br></br><Typography component="p" id="uname" className="grey_text">@{this.props.uname}</Typography>
                            <Typography component="p" className="about_line">{this.props.allData.about}{this.props.allData.personal && <Create className="change_about vertical-align only_grey little_left" onClick={this.handleOpen3} />}</Typography>
                            <Grid id="options_info" container spacing={0}>
                                <Grid item xs={12} sm={4}>
                                    {this.props.personal ?
                                        <Chip
                                            className="follow_button_color"
                                            avatar={<Avatar className="following_button_color">{this.state.no_of_followers}</Avatar>}
                                            label={this.state.no_of_followers > 1 || this.state.no_of_followers == 0 ? "Followers" : "Follower"}
                                            variant="outlined"
                                        /> :
                                        <div id="follow" onClick={this.follow_click}>
                                            {!this.state.follow ?
                                                <Chip
                                                    className="follow_button_color"
                                                    avatar={<Avatar className="following_button_color">{this.state.no_of_followers}</Avatar>}
                                                    label="Follow"
                                                    clickable
                                                    onClick={this.follow_click1}
                                                    onDelete={() => { }}
                                                    deleteIcon={<RssFeed className="follow_button_color" />}
                                                    variant="outlined"
                                                /> :
                                                <Chip
                                                    className="following_button_color"
                                                    avatar={<Avatar className="follow_button_color">{this.state.no_of_followers}</Avatar>}
                                                    label="Following"
                                                    clickable
                                                    onClick={this.follow_click2}
                                                    onDelete={() => { }}
                                                    deleteIcon={<Check className="following_button_color" />}
                                                />
                                            }
                                        </div>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default InfoGrid