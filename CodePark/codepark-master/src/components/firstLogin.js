import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import Cookie from './cookie';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Paper from '@material-ui/core/Paper';
// import Send from '@material-ui/icons/Send'
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import urls from './urls';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


let BASE_URL = urls.API_URL;

function getSteps() {
    return ['Username', 'Experience', 'Tags','Profile Picture'];
}

class FirstLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            tags:[],
            programmingExperience:'',
            profileImages:[],
            activeStep:0
        }
    }

    componentDidMount(){
        document.title = "CodePark | Welcome"
        this.getInfo();
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    getInfo = () => {
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
                username:inf.username,
                tags:inf.tags,
                programmingExperience:inf.programmingExperience,
                profileImages:inf.profileImages
            })
        }, (err) => {
        })
    }

    render(){
        const steps = getSteps();
        const { activeStep } = this.state;
        return(
            <div id="all">
                <Stepper className="secondary_color" activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step className= "secondary_color" key={label}>
                            <StepLabel className="secondary_color">{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {this.state.activeStep == 0 && <Username username={this.state.username} handleNext={this.handleNext} />}
                {this.state.activeStep == 1 && <Experience handleNext={this.handleNext} />}
                {this.state.activeStep == 2 && <Tags tags={this.state.tags} handleNext={this.handleNext} />}
                {this.state.activeStep == 3 && <UserAvatar history={this.props.history} avatars={this.state.profileImages} handleNext={this.handleNext} />}
            </div>
        )
    }
}

class Username extends Component{
    constructor(props){
        super(props)
        this.state = {
            new_username: '',
            open: false,
            vertical: 'top',
            horizontal: 'center',
            wrong_message: 'Please enter valid username',
            load: false
        }
    }

    componentDidMount(){
        this.setState({
            new_username: this.state.username
        })
    }


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClick = (message) => {
        this.setState({ open: true, wrong_message: message });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    check = ()=>{
        this.setState({
            load:true
        })
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL+'/u/profile/update/username',{
            username:this.state.new_username
        },{
            headers:{
                Authorization: "Bearer " + cookie
            }
        }).then((res)=>{
            if(res.data.code===1){
                this.handleClick(res.data.message)
                this.setState({
                    load: false
                })
            }
            else{
                this.props.handleNext()
            }
        },(err)=>{
        })
    }

    render(){
        // <div id="correct"><p style={this.styles}>{this.state.correct}</p></div>
        const { vertical, horizontal, open } = this.state;
        return(
            <div id="username">
                <Paper className="paper">
                <Typography variant="headline" component="h2" id="choose" className="flhead">Choose a username</Typography>
                <div>
                <Grid className="use" container spacing={8} alignItems="flex-end">
                    <Grid item>
                    <TextField defaultValue={this.state.new_username} onChange={this.handleChange('new_username')} id="input-with-icon-grid" label="Username" />
                    <Typography component="p" className="in_red">* You cannot change username later</Typography>
                    </Grid>
                </Grid>
                <NextButton load={this.state.load} func={this.check} id="username_next"/>
                </div>
                </Paper>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.wrong_message}</span>}
                />
            </div>
        )
    }
}

class Experience extends Component{
    constructor(props){
        super(props)
        this.checkOne=this.checkOne.bind(this)
    }

    state = {
        value: '',
        exp_of_user : ['No programming experience', 'Have Little Knowledge', 'Experienced programmer', 'Have worked a lot with programming', 'Expert programmer'],
        load:false,
        vertical: 'top',
        horizontal: 'center'
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    checkOne = ()=>{
        this.setState({
            load:true
        })
        if(this.state.value===''){
            this.handleClick()
            this.setState({
            load:false
        })
        }
        else{
            let cookie = Cookie.getCookie('CP');
            axios.post(BASE_URL+'/u/profile/update/programmingExperience', {
                userProgrammingExperience: this.state.exp_of_user[this.state.value - 1]
            }, {
                    headers: {
                        Authorization: "Bearer " + cookie
                    }
                }).then((res)=>{
                    this.props.handleNext()
                })
        }
    }

    render(){
        const { vertical, horizontal, open } = this.state;
        return(
            <div id="experience">
            <Paper className="paper">
                <Typography variant="headline" component="h2" id="rate_heading" className="flhead">Rate your programming experience</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        id="expList"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="1" control={<Radio color="primary"/>} label="No programming experience" />
                        <FormControlLabel value="2" control={<Radio color="primary"/>} label="Have Little Knowledge" />
                        <FormControlLabel value="3" control={<Radio color="primary"/>} label="Experienced programmer" />
                        <FormControlLabel value="4" control={<Radio color="primary"/>} label="Have worked a lot with programming" />
                        <FormControlLabel value="5" control={<Radio color="primary"/>} label="Expert programmer" />

                    </RadioGroup>
                </FormControl>
                <NextButton load={this.state.load} func={this.checkOne} id="exp_next" />
                </Paper>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Please fill one.</span>}
                />
            </div>
        )
    }
}

class Tags extends Component{
    constructor(props){
        super(props);
        this.state={
            tags:[],
            load:false,
            vertical: 'top',
            horizontal: 'center',
            wrong_message: 'Select atleast 10.',
            number_selected:0
        }
    }

    handleClick = (message) => {
        this.setState({ open: true, wrong_message: message });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount(){
        this.setState({
            tags:this.props.tags
        },this.updateTags())
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tags:nextProps.tags
        }, this.updateTags())
    }

    updateTags = () => {
        let tags = this.state.tags;
        let tags_state = []

        tags.forEach((val, ind) => {
            tags_state.push(false)
        });
        this.setState({ tags_state: tags_state });
    }
    check_some = () => {
        this.setState({
            load:true
        })
        let tags=this.state.tags
        let tags_state = this.state.tags_state;
        let done_tags = []
        tags.forEach((val, ind) => {
            if (tags_state[ind]) {
                done_tags.push(val)
            }
        })
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL+'/u/profile/update/tags', {
            tags:done_tags
        }, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            }).then((res) => {
                if(res.data.code!==0){
                    this.handleClick(res.data.message)
                    this.setState({
                        load: false
                    })
                }
                else{
                    this.props.handleNext()
                }
            }).catch(err => {
            })
        
    }

    highlight = (e) => {
        let to_high = e.target.textContent
        let tags_state= this.state.tags_state;
        this.state.tags.forEach((val, ind) => {
            if (val === to_high) {
                if(tags_state[ind]){
                    this.setState({
                        number_selected: this.state.number_selected-1
                    })
                }
                else{
                    this.setState({
                        number_selected: this.state.number_selected+1
                    })
                }
                tags_state[ind] = !tags_state[ind]
            }
        })
        this.setState({tags_state});
    }

    render(){
        const { vertical, horizontal, open } = this.state;
        let tags = this.state.tags;
        let tags_state=this.state.tags_state
        return(
            <div id="tags">
            <Paper className="paper">
            {tags && <div>
                <Typography variant="headline" component="h2" id="tags_heading1" className="flhead">Pick your interests</Typography>
                <Typography component="p" className="atleast_line little_up text_bold_600">Select atleast 10 tags</Typography>
                <Typography component="p" className="show_selected">Number of tags selected <Typography className="show_number_selected" component="p">{this.state.number_selected}</Typography></Typography>
                <Grid container spacing={16} className="tags">
                    {
                        tags.map((tag,ind)=>(
                            <Grid item><Tag highlight={this.highlight} label={tags[ind]} yes={tags_state[ind]} /></Grid>
                        ))
                    }
                </Grid>
                <NextButton load={this.state.load} func={this.check_some} id="go" />
                </div>}
                </Paper>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.wrong_message}</span>}
                />
            </div>
        )
    }
}

class UserAvatar extends Component{
    constructor(props){
        super(props)
        this.state={
            avatars:this.props.avatars,
            selected:'',
            load:false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            avatars: nextProps.avatars
        })
    }

    chosen=(e)=>{
        let all=document.querySelectorAll('.edit_avatar_each')
        all.forEach((val,ind)=>{
            val.style.border = ""
        })
        this.setState({
            selected:e.target.src
        })
        e.target.style.border = "solid 5px #1e88e5"
    }

    go_func=()=>{
        this.setState({
            load:true
        })
        let cookie = Cookie.getCookie('CP');
        axios.post(BASE_URL+'/u/profile/update/avatar', {
            avatar:this.state.selected
        }, {
                headers: {
                    Authorization: "Bearer " + cookie
                }
            }).then((res) => {
                if(res.data.code === 0) {
                    // this.props.history.push('/dashboard');
                    if (localStorage.getItem('about_to_register')){
                        window.location.href=`/events/${localStorage.getItem('about_to_register')}`;
                    }
                    else{
                        window.location.href = '/dashboard';
                    }
                }
                else{
                    this.setState({
                        load:false
                    })
                }
            }).catch(err => {
            })
    }

    render(){
        return(
            <div id="avatar">
            <Paper className="paper">
            {this.state.avatars && 
            <div>
                <Typography variant="headline" component="h2" className="flhead">Choose an avatar</Typography>
                {
                    this.state.avatars.map((val1,ind)=>(
                        <div>
                            <Typography component="p" className="avatar_category_heading">{val1.category}</Typography>
                            <Grid container spacing={24}>
                                {
                                    val1.avatars.map((val, ind) => (
                                        <Grid item xs={3} sm={3} md={2}>
                                            <img onClick={this.chosen} className="edit_avatar_each" src={val} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                    ))
                }
                <SubmitButton go_func={this.go_func} load={this.state.load}/>
            </div>}
            </Paper>
            </div>
        )
    }
}

class Tag extends Component{
    render(){
        return (
            <div>
                {this.props.yes ? 
                    <Chip className="tag_chip" style={{ backgroundColor: "#00B389", color: "white"}} onClick={this.props.highlight} clickable label={this.props.label} />
                    :
                    <Chip className="tag_chip" style={{ backgroundColor: "white", color: "black" }} onClick={this.props.highlight} clickable label={this.props.label} variant="outlined" />
                }
            </div>
        )
    }
}

class NextButton extends Component{
    render(){
        return (
        <div>
            <Button id={this.props.id} className="next_button" onClick={this.props.func} variant="contained" color="secondary">
                Next {this.props.load ? <CircularProgress className="loader_white little_left" size={24}/> : <KeyboardArrowRight />}
            </Button>
        </div>
    )
}
}

class SubmitButton extends Component{
    render() {
        return (
            <div>
                <Button onClick={this.props.go_func} className="submit_button" variant="contained" color="secondary">
                    Submit {this.props.load ? <CircularProgress className="loader_white little_left" size={24} /> : <KeyboardArrowRight />}
                </Button>
            </div>
        )
    }
}

// axios.request({
//     url: BASE_URL + `/u/profile/update/username`,
//     method: "POST",
//     body:{
//         username:'shivank'
//     }
// }).then((res) => {
//     console.log(res)
//     }, (err) => {
//     console.log(err)
// })

// axios.request({
//     url: BASE_URL + `/u/profile/update/username`,
//     method: "POST",
//     body: {
//         userCodingExperience:'Expert programmer'
//     }
// }).then((res) => {
//     console.log(res)
// }, (err) => {
//     console.log(err)
// })

// axios.request({
//     url: BASE_URL + `/u/profile/update/tags`,
//     method: "POST",
//     body: {
//         tags:['Java','Python','Web development']
//     }
// }).then((res) => {
//     console.log(res)
// }, (err) => {
//     console.log(err)
// })


export {FirstLogin}