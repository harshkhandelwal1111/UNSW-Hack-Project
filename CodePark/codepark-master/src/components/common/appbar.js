import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Create from '@material-ui/icons/Create';
import AccessTime from '@material-ui/icons/AccessTime';
import Sort from '@material-ui/icons/Sort';
// import Bell from '../../images/common/alarm.png'
// import BellGold from '../../images/common/alarm_gold.png'
import {NotificationsActive, NotificationsActiveOutlined} from '@material-ui/icons';
import {NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookie from '../cookie';
import moment from 'moment';
import codepark from '../../images/common/codepark.png';
import codeparkSmall from '../../images/common/icons-192.png';
import urls from '../urls';
import userimg from './../../images/common/username.png';
import {Snackbar} from '@material-ui/core'
// import earn_img from '../../images/common/earnings.png';
import Button from '@material-ui/core/Button';
// import Avatar from '@material-ui/core/Avatar'

import './appbar.css';

let BASE_URL = urls.API_URL;

const vertical = "top";
const horizontal = "center";

const styles = theme => ({
  root: {
    width: '100%',
    position: 'sticky',
    top: '0px',
    zIndex: 999
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    zIndex: 99999
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#000',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      navAnchorEl: null,
      navMobileMoreAnchorEl: null,
      notifmsg: '',
      notif: [],
      notifTotal: 0,
      searchInput: '',
      openSnackbar: false,
      msgSnackbar: ''
    };
    this.getNotification();
    // this.fillInitialValue();
  }

  getNotification = () => {
    let cookie = Cookie.getCookie('CP');
    let config = {headers: {'Authorization': 'Bearer '+cookie}}
    axios.get(BASE_URL + '/u/notifications', config)
    .then(function(response) {
      let data = response.data;
      // console.log('notificationdata',data);
      if(data.code === 0) {
        this.setState({notifmsg: data.message, notif: data.notifications, 
          notifTotal: data.no_of_unread_notifications});
      }
    //   console.log('notiftotal',this.state.notifTotal);
    }.bind(this))
    .catch(function(error) {
    })
  }

  fillInitialValue=(e)=>{
    // document.getElementById('new_search_box').value = this.props.search_query
  }

  onClose = () => {
    this.setState({ openSnackbar: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  //notification

  handleNavOpen = event => {
    this.setState({ navAnchorEl: event.currentTarget });
    this.postNotif();
  };

  handleNavClose = () => {
    this.setState({ navAnchorEl: null });
    this.handleMobileNavClose();
  };

  handleMobileNavOpen = event => {
    this.setState({ navMobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileNavClose = () => {
    this.setState({ navMobileMoreAnchorEl: null });
  };

  logout = () => {
    Cookie.deleteCookie('CP');
    localStorage.clear();
    // window.location.href = "/logout";
    setTimeout(function(){ window.location.href = "/logout" }, 2000);
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  // postNotif = () => {
  //   let cookie = Cookie.getCookie('CP');
  //   let config = {
  //     headers : {'Authorization':'Bearer '+ cookie},
  //   }
  //   axios.post(BASE_URL + '/u/notifications', {}, config);
  // }

  search = (e) => {
    e.preventDefault();
    let searchInput=this.state.searchInput
    // let searchInput = document.getElementById('new_search_box').value;
    // console.log(this.state.searchInput);
    // this.props.history.push(`/search/${this.state.searchInput}`);
    if(searchInput && searchInput.length>=3) {
      window.location.href = `/search?query=${searchInput}`;
    }
    else {
      this.setState({openSnackbar: true, msgSnackbar: 'The query should be minimum of 3 characters.'})
    }
  }

  go_to_events=()=>{
    window.location.href="/events"
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl, navAnchorEl, navMobileMoreAnchorEl } = this.state;
    const { classes, location: {pathname} } = this.props;
    // const { pathname } = this.props.location;
    const isMenuOpen = Boolean(anchorEl);
    const isNavOpen = Boolean(navAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMobileNavOpen = Boolean(navMobileMoreAnchorEl);
    let notifArr=this.state.notif;
    let showNotifArr=[];
    if(this.state.notif) {
      for(let i=0;i<this.state.notif.length;i++) {
        showNotifArr.push(
          <div>
          {notifArr[i].unread && <li className="paper border-bottom-black border-top-black bg-white"><a href={notifArr[i].link} className="text-decor color-black">
        {/*<img src={earn_img} alt="codepark" className="marg-one" />*/} <Typography component="p" className="text_bold_600">{notifArr[i].notification}</Typography></a>
          <Typography component="p" className="color-grey notif-time">{moment(notifArr[i].created_at, moment.ISO_8601).fromNow()}</Typography></li>}

            {!notifArr[i].unread && <li className="paper border-bottom-black border-top-black bg-white"><a href={notifArr[i].link} className="text-decor color-black">
          <Typography component="p" className="text_bold_600">{notifArr[i].notification}</Typography></a>
          <Typography component="p" className="color-grey notif-time">{moment(notifArr[i].created_at, moment.ISO_8601).fromNow()}</Typography></li>}
          </div>
        )
      }
    }

    // console.log('notificationsarray',showNotifArr);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {/* <NavLink to={`/user/${localStorage.getItem('username')}`} className="text-decor notification-paper"> */}
          <MenuItem onClick={()=>{window.location.href=`/user/${localStorage.getItem('username')}`}} 
          className="text-decor">Profile</MenuItem>
        {/* </NavLink> */}
        <MenuItem onClick={this.logout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >          
        {/*<MenuItem onClick={this.handleProfileMenuOpen}>
         <IconButton>
          <Avatar alt={localStorage.getItem('username')} 
            src={localStorage.getItem('userimg')?localStorage.getItem('userimg'):userimg}
            className="user-avatar-sm mright-half" />
          </IconButton>
          <div onClick={this.handleProfileMenuOpen} className="center-vert pointer">
              <img className="user-avatar-sm nav-avatar" alt={localStorage.getItem('username')}
              src={localStorage.getItem('userimg')?localStorage.getItem('userimg'):userimg} 
              onClick={this.handleProfileMenuOpen}></img>
          </div>
          <p>{localStorage.getItem('username')}</p>
    </MenuItem>*/}
        <MenuItem onClick={() => { window.location.href = `/user/${localStorage.getItem('username')}` }}
          className="text-decor">Profile</MenuItem>
        <MenuItem onClick={()=>{ window.location.href="/notifications" }} className="text-decor">Notifications</MenuItem>
        <MenuItem onClick={this.logout}>Logout</MenuItem>
      </Menu>
    );

// navbar
    const navRenderMenu = (
      <Menu
        anchorEl={navAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isNavOpen}
        onClose={this.handleNavClose}
      >
      {/* <MenuItem onClick={this.handleClose} className="text-decor">Profile</MenuItem> */}
      {((!this.state.notif) || ( this.state.notif && this.state.notif.length===0)) && 
        <Paper className="paper notification-paper">{this.state.notifmsg}</Paper>}
        {(this.state.notif && this.state.notif.length>0 ) &&
        <Paper className="notification-paper notification">
        <ul className="padding-zero">
        <li className="padding-zero"><Typography component="p" className="notif_heading f-bold mleft-one mtop-half">
        Notifications</Typography></li>
        {showNotifArr}
        </ul>
        </Paper>}
      </Menu>
    );
    

    // let notification = this.state.notif;
    // console.log('notif',notification)
    // let notiflen;
    // if(notification) {
    //   notiflen=notification.length;
    // }

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: "#fff"}}>
          <Toolbar>
            <NavLink to="/">
              <img src={codepark} alt="Codepark" className="brand-img hide-small" />
              <img src={codeparkSmall} alt="Codepark" className="brand-img hide-big" />
            </NavLink>
            <form className={classes.search} onSubmit={this.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                className="search_box"
                placeholder="Search…"
                defaultValue={this.props.search_query || ""}
                onChange={this.handleChange('searchInput')}
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
              </form>
              {/*<form onSubmit={this.search}>
              <input id="new_search_box" type="text" name="search" placeholder="Search.."></input>
              </form>*/}
            <Button onClick={this.go_to_events} className="events_btn" variant="outlined">EVENTS</Button>
            <div className={classes.grow} />
            <div className={`${classes.sectionDesktop} nav-icons`}>

            <NavLink to="/notifications">
              <IconButton title="Notifications"
                className="notif-icon-button"
                aria-owns={isNavOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                // onClick={this.postNotif}
                >
                {/* {console.log(this.state.notifTotal)} */}
                  {(this.state.notifTotal> 0)? 
                    <Badge className={classes.margin} badgeContent={this.state.notifTotal} color="secondary">
                      {pathname==='/notifications'?<NotificationsActive className="color-theme"/>:<NotificationsActiveOutlined/>}
                    </Badge>:
                    pathname==='/notifications'?<NotificationsActive className="color-theme"/>:<NotificationsActiveOutlined/>
                  }
                </IconButton>
                <p className={pathname==='/notifications'?'color-theme': ''}>Notifications</p>
              </NavLink>
              
              <NavLink to="/questions/recent" className={pathname==='/questions/recent'?'color-theme':''}>
                <IconButton title="Recent Questions" className="notif-icon-button" >
                  <AccessTime className={pathname==='/questions/recent'?'color-theme': ''}/>
                </IconButton>
                <p>Recent</p>
              </NavLink>

              <NavLink to="/questions/unanswered" className={pathname==='/questions/unanswered'?'color-theme':''}>
                <IconButton title="Unanswered Questions" className="notif-icon-button">
                  <Sort className={pathname==='/questions/unanswered'?'color-theme': ''}/>
                </IconButton>
                <p>Unanswered</p>
              </NavLink>

              <NavLink to="/question" className={pathname==='/question'?'color-theme':''}>
                <IconButton className="notif-icon-button" title="Add your question">
                    <Create className={pathname==='/question'?'color-theme': ''}/>
                </IconButton>
                <p>Add</p>
              </NavLink>
              {/* <IconButton className="nav-avatar"
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}                
              >
                <Avatar alt={localStorage.getItem('username')} 
                src={localStorage.getItem('userimg')?localStorage.getItem('userimg'):userimg}
                className="user-avatar-sm nav-avatar" />
              </IconButton> */}
              <div onClick={this.handleProfileMenuOpen} className="pointer profile">
                <img className="user-avatar-sm nav-avatar" alt={localStorage.getItem('username')}
                src={localStorage.getItem('userimg')?localStorage.getItem('userimg'):userimg} 
                onClick={this.handleProfileMenuOpen}></img>
                <p>Me</p>
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen}>
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {navRenderMenu}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={2000}
          onClose={this.onClose}
        />
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));
