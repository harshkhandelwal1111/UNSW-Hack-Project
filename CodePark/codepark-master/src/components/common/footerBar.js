import React, { Component } from 'react';

// import Create from '@material-ui/icons/Create';
import AccessTime from '@material-ui/icons/AccessTime';
import Sort from '@material-ui/icons/Sort';
// import Bell from  '../../images/common/alarm.png'
// import BellGold from '../../images/common/alarm_gold.png'
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import Home from '@material-ui/icons/Home';
import {Badge} from '@material-ui/core';
import {NotificationsActive, NotificationsActiveOutlined} from '@material-ui/icons';
import {withRouter, NavLink} from 'react-router-dom';
import axios from 'axios';

import Cookie from '../cookie';
import urls from '../urls';
import './footerBar.css';

const BASE_URL = urls.API_URL;

class FooterBar extends Component {
    constructor() {
        super();
        this.state = {
            notifTotal: 0
        }
        this.getNotification();
    }
    componentDidMount() {
        let lastScrollTop = 0;
        // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
        let st = window.pageYOffset || document.documentElement.scrollTop;
        let footerBar = document.getElementById('footer-bar');
        if(footerBar) {
            if (st > lastScrollTop){
                footerBar.classList.add("hide");
                // downscroll code
            } else {
                footerBar.classList.remove("hide");
                // upscroll code
            }   
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', false);
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


    render() {
        let {pathname} = this.props.location;
        let {notifTotal} = this.state;
        return(
            <div id="footer-bar" className="footer-bar">
                <NavLink to="/">
                    {(pathname==='/' || pathname==='/dashboard')? <Home className="color-theme" />:
                    <HomeOutlined className=""/>}
                    <p>Home</p>
                </NavLink>
                {/* <Bell/> */}
                <NavLink to="/notifications">
                    {(notifTotal> 0)? 
                        <Badge className="" badgeContent={notifTotal} color="secondary">
                        {pathname==='/notifications'?<NotificationsActive className="color-theme"/>:<NotificationsActiveOutlined/>}
                        </Badge>:
                        pathname==='/notifications'?<NotificationsActive className="color-theme"/>:<NotificationsActiveOutlined/>
                    }
                    <p className={notifTotal>0?"footer-notif-active":''}>Notifications</p>
                </NavLink>
                {/* <a href="/questions/recent"> */}
                <NavLink to="/questions/recent">
                    <AccessTime className={pathname==='/questions/recent'?'color-theme': ''}/>
                    <p>Recent</p>
                </NavLink>
                <NavLink to="/questions/unanswered">
                    <Sort className={pathname==='/questions/unanswered'?'color-theme': ''}/>
                    <p>Unanswered</p>
                </NavLink>
            </div>
        );
    }
}
export default withRouter(FooterBar);