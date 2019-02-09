import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import School from '@material-ui/icons/School'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import urls from './../urls';
import axios from 'axios';
import Cookie from '../cookie';
import Add from '@material-ui/icons/Add'

let BASE_URL = urls.API_URL;

class Education extends Component {
    state={
        open:false,
        institute:'',
        major:'',
        degree:'',
        present:true,
        yearOfStart:'',
        yearOfEnd:''
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChange1 = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    add_education=()=>{
        let education={
            institute:this.state.institute,
            major: this.state.major,
            degree: this.state.degree,
            yearOfStart: this.state.yearOfStart,
            present: this.state.present,
            yearOfEnd:this.state.present?'':this.state.yearOfEnd
        }
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL+'/u/profile/update/education',education,{
                headers: {
                    Authorization: "Bearer " + cookie
                }
            }).then((res)=>{
            })
    }

    render() {
        return (
            <div id="education"><br></br>
                {(this.props.education) &&
                    <div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}
                        className="modal_edit_edu"
                    >
                        <Paper className="paper">
                            <div id="edit_name_div">
                                <Typography variant="headline" component="h2" className="no_space_heading">Add</Typography>
                                <Typography variant="headline" component="h2" className="theme_color no_space_heading">Education</Typography>
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Institute"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange('institute')}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Major"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange('major')}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Degree"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange('degree')}
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="standard-required"
                                    label="Year Of Start"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange('yearOfStart')}
                                    fullWidth
                                />
                                <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.present}
                                            onChange={this.handleChange1('present')}
                                            value="present"
                                        />
                                    }
                                    label="Presently studying"
                                />
                                </FormGroup>
                                {!this.state.present && <TextField
                                    required
                                    id="standard-required"
                                    label="Year Of End"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange('yearOfEnd')}
                                    fullWidth
                                />}
                            </div>
                            <Button className="edit_buttons" onClick={this.add_education}>Done</Button><Button className="edit_buttons little_left" onClick={this.handleClose}>Cancel</Button>
                        </Paper>
                    </Modal>
                    <Paper className="paper">
                    <Typography component="p" id="user_edu">Education</Typography>
                    <Button onClick={this.handleOpen} className="add_edu_btn"><Add />Add</Button>
                    {/*<Typography onClick={this.handleOpen} component="p" className="add_edu little_left pointer">Add</Typography>*/}
                        {
                            this.props.education.map((val, ind) => (
                                <div className="each_edu">
                                <div className="center-vert">
                                <School id="grade" className="marg-one" />
                                <div>
                                <Typography component="p">
                                    {val.degree} {val.major} from {val.institute}
                                </Typography>
                                <Typography className="grey_color">
                                    {val.yearOfStart}-{val.present && 'Present' || val.yearOfEnd}
                                </Typography>
                                </div>
                                </div>
                                </div>
                            ))
                        }
                    </Paper>
                    </div>}
            </div>
        )
    }
}

export default Education