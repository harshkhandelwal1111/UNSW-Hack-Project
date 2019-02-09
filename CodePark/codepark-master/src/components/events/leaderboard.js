import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import Cookie from '../cookie';
import urls from './../urls';
// import { NavLink } from 'react-router-dom';
import PrimarySearchAppBar from '../common/appbar';
import Grid from '@material-ui/core/Grid';
// import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import score_img from '../../images/common/score.png';
import rank_img from '../../images/common/rank.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FooterBar from '../common/footerBar';

let BASE_URL = urls.COMPETE_URL;

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


class Leaderboard extends Component{
    constructor(props){
        super(props)
        this.get_xp()
        this.open_leaderboard(0)
    }
    

    state = {
        event_name:'',
        event_url_name:'',
        event_image:'',
        open:'',
        xp:0,
        rank:0,
        reg_time:'',
        rows: [],
        page: 0,
        rowsPerPage: 10,
        rows2:[],
        page2: 0,
        rowsPerPage2: 10,
        lead_total:0,
        logs_total:0
    };

	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `See Progress | CodePark`,
			description : `See your progress in a particular event.`,
			url : `https://codepark.in`,
			keywords : `CodePark,events,see progress`
			}
			document.title = metaData.title;
			document.querySelector('meta[name="title"]').setAttribute("content", metaData.title);
			document.querySelector('meta[name="description"]').setAttribute("content", metaData.description);
			document.querySelector('meta[name="keywords"]').setAttribute("content", metaData.keywords);
			document.querySelector('meta[itemprop="keywords"]').setAttribute("content", metaData.keywords);
			document.querySelector('meta[property="og:title"]').setAttribute("content", metaData.title);
			document.querySelector('meta[property="og:description"]').setAttribute("content", metaData.description);
			document.querySelector('meta[property="og:url"]').setAttribute("content", metaData.url);
			document.querySelector('meta[name="twitter:title"]').setAttribute("content", metaData.title);
			document.querySelector('meta[name="twitter:description"]').setAttribute("content", metaData.description);
			/**
			 * --------------------------------
			 */
	}
    handleChangePage = (event,page) => {
        this.setState({ page:page });
        this.open_leaderboard(page)
    };

    handleChangePage2 = (event,page2) => {
        this.setState({ page2:page2 });
        this.open_logs(page2)
    };

    open_leaderboard=(page)=>{
        let cookie=Cookie.getCookie('CP')
        axios.get(BASE_URL + `/events/leaderboard/${this.props.match.params.name}?node=${page}`,{
            headers:{
                Authorization: "Bearer "+cookie
            }
        }).then((res)=>{
            this.setState({ open: "lead", rows:res.data.userData, rank: res.data.user_rank, lead_total: res.data.participants  })
        })
    }

    open_logs=(page2)=>{
        let cookie = Cookie.getCookie('CP')
        axios.get(BASE_URL + `/events/activity/${this.props.match.params.name}?node=${page2}`, {
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            this.setState({ open: "logs", rows2:res.data.activities, logs_total:res.data.activityCount })
        })
    }

    get_xp=()=>{
        let cookie = Cookie.getCookie('CP')
        axios.get(BASE_URL + `/events/progress/${this.props.match.params.name}`, {
            headers: {
                Authorization: "Bearer " + cookie
            }
        }).then((res) => {
            this.setState({ event_name: res.data.userData.eventName, event_url_name: res.data.userData.eventUrlName, event_image:res.data.userData.eventImage, xp: res.data.userData.xp, reg_time: moment(Number(res.data.userData.registerationTime)).format('llll') })
        }).catch(err=>{
        })
    }

    render(){
        const { rows, page, rowsPerPage, rows2, page2, rowsPerPage2, lead_total, logs_total } = this.state;
        const emptyRows = 10-rows.length;
        const emptyRows2 = 10-rows2.length;
        return(
            <div className="full_leaderboard">
            <PrimarySearchAppBar />
            <div className="leaderboard_heading">
                <Typography component="p" className="leaderboard_heading">Progress</Typography>
            </div>
                <div className="leaderboard_grid">
                <Grid container spacing={false}>
                <Grid item xs={12}>
                        <Paper className="paper_padding">
                                <img className="ld_pic" src={this.state.event_image} />
                                <Typography component="p" className="ld_name">{this.state.event_name}</Typography>
                                <Typography component="p" className="ld_xp_head">Your XP is </Typography>
                                <Typography component="p" className="ld_xp_value little_left">{this.state.xp}</Typography><br></br>
                                <Typography component="p" className="ld_rank_head">Rank in the Leaderboard </Typography>
                                <Typography component="p" className="ld_rank_value little_left">{this.state.rank}</Typography><br></br>
                                <Typography component="p" className="ld_regtime_head">Registered on </Typography>
                                <Typography component="p" className="ld_regtime_value little_left">{this.state.reg_time}</Typography><br></br>
                                <Button onClick={() => { this.open_leaderboard(0) }} className="see_leaderboard">Leaderboard</Button>
                                <Button onClick={() => { this.open_logs(0) }} className="see_leaderboard little_left">Your Activities</Button>
                        </Paper>
                        {/*<Paper className="leaderboard_item">
                            <Grid container spacing={false}>
                                <Grid item xs={12} md={3}>
                                    {this.state.event_image && <img className="lead_event_pic" src={this.state.event_image} />}
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography component="p" className="leaderboard_event_name">{this.state.event_name}</Typography>
                                    <Typography component="p" className="leaderboard_your_progress">Your progress</Typography>
                                    <Grid container spacing={false}>
                                        <Grid item md={4} xs={12}>
                                                <div className="leaderboard_event_score">
                                                    <img src={score_img} className="score_part1" />
                                                    <div className="score_part2">
                                                    <Typography component="p" className="leaderboard_event_head">XP</Typography>
                                                    <Typography component="p" className="leaderboard_event_value">{this.state.xp}</Typography>
                                                    </div>
                                                </div>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                                <div className="leaderboard_event_rank">
                                                    <img src={rank_img} className="rank_part1" />
                                                    <div className="rank_part2">
                                                    <Typography component="p" className="leaderboard_event_head">Rank</Typography>
                                                    <Typography component="p" className="leaderboard_event_value">N/A</Typography>
                                                    </div>
                                                </div>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <div className="leaderboard_event_rank">
                                                <Typography component="p" className="reg_time text_bold_600">Registration Time:</Typography>
                                                <Typography component="p" className="reg_time_value text_bold_600">{this.state.reg_time}</Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Button onClick={()=>{this.open_leaderboard(0)}} className="see_leaderboard">Leaderboard</Button>
                                    <Button onClick={()=>{this.open_logs(0)}} className="see_leaderboard">Activity logs</Button>
                                </Grid>
                            </Grid>
                        </Paper>*/}
                </Grid>
                </Grid>
                </div>
                <div className="show_lead_logs">
                {   this.state.open === "lead" &&
                    <div className="lead_table">
                    <Typography component="p" className="lead_tab_heading only_grey">Leaderboard</Typography>
                    <Paper>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Rank</CustomTableCell>
                                    <CustomTableCell align="right">Name</CustomTableCell>
                                    <CustomTableCell align="right">XP</CustomTableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    {rows.map((row,ind) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {page*10+ind+1}
                                                </TableCell>
                                                <TableCell className="pointer" onClick={()=>{ window.location.href=`/user/${row.username}` }} align="right">{row.username}</TableCell>
                                                <TableCell align="right">{row.xp}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 48 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={10}
                                            colSpan={3}
                                            count={this.state.lead_total}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            onChangePage={this.handleChangePage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </div>
                    || this.state.open === "logs" &&
                    <div className="log_table"> 
                        <Typography component="p" className="lead_tab_heading only_grey">Your Activities</Typography>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Order</CustomTableCell>
                                        <CustomTableCell align="right">Activity</CustomTableCell>
                                        <CustomTableCell align="right">Time</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows2.map((row,ind) => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {page2*10+ind+1}
                                                </TableCell>
                                                <TableCell align="right">{row.activity}</TableCell>
                                                <TableCell align="right">{moment(row.timestamp).format("llll")} IST</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows2 > 0 && (
                                        <TableRow style={{ height: 48 * emptyRows2 }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={10}
                                            colSpan={3}
                                            count={this.state.logs_total}
                                            rowsPerPage={rowsPerPage2}
                                            page={page2}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            onChangePage={this.handleChangePage2}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </div>
                }
                </div>
                <FooterBar />
            </div>
        )
    }
}

export default Leaderboard