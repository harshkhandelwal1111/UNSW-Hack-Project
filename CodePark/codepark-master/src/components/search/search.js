import React, { Component } from 'react';
import axios from 'axios';
import urls from '../urls';
import Cookie from '../cookie';
// import Feed from './dashboard/feed';
// import ShowSearch from './showSearch';
import PrimarySearchAppBar from '../common/appbar';
import { CircularProgress } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FaceIcon from '@material-ui/icons/Face';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AllResults from './allresults.js'
import FooterBar from '../common/footerBar';
// import Hidden from '@material-ui/core/Hidden';

let BASE_URL = urls.API_URL;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            main_value:1,
            sub_value:2,
            hasCome:false
        }
        this.search(2);
    }

    componentDidMount() {
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Search results on CodePark | ${this.props.location.search.split('?query=')[1]}`,
			description : `Search from hundreds of questions on CodePark.`,
			url : `https://codepark.in/search`,
			keywords : `CodePark,search,${this.props.location.search.split('?query=')[1]}`
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

    setSubValue = (val) => event => {
        this.setState({ sub_value:val,hasCome:false });
        this.search(val)
    }; 

    setMainValue = (event, val) => {
        this.setState({ main_value:val });
        if(val===0) {
            this.setState({sub_value: 1});
            this.search(1);
        }
        else if(val===1) {
            this.setState({sub_value: 2});
            this.search(2);
        }
        // console.log(val);
        // if()
        // console.log(val);
        // if(val===0){
        // this.setState({ sub_value: 1, hasCome: false });
        // this.search(1)
        // }
        // else{
        //     this.setState({ sub_value: 2, hasCome: false });
        //     this.search(2)
        // }
    };

    search = (sub_val) => {
        let cookie = Cookie.getCookie('CP');
        let config = {headers: {'Authorization': 'Bearer '+ cookie}}
        let main_choices=["user","content"]
        let sub_choices= ["username", "name", "none", "exact", "answered", "unanswered", "topic"]
        let type
        if(this.state.main_value===0 || sub_val===1){
            type="user"
        }
        else{
            type="content"
        }
        axios.get(BASE_URL + `/search?query=${decodeURIComponent(this.props.location.search.split('?query=')[1])}&node=0&type=${type}&filter=${sub_choices[sub_val]}`,config)
        .then(function(response) {
            let data = response.data;
            // console.log(data)
            this.setState({data,hasCome:true});
        }.bind(this))
        .catch(function(error) {
        })
    }

    render() {
        return(
            <div>
                <PrimarySearchAppBar search_query={decodeURIComponent(this.props.location.search.split('?query=')[1])} /><br/>
                <Grid container justify="center" spacing={24}>
                <Grid item xs={12} md={2} lg={2}>
                    <div className="filters">
                        <Paper className="paper filters_paper">
                            <Typography className="filters_heading" variant="headline" component="h4">Search Filters</Typography>
                                <BottomNavigation
                                    className="select_2_filter"
                                    value={this.state.main_value}
                                    onChange={this.setMainValue}
                                    showLabels
                                >
                                    <BottomNavigationAction label="User" icon={<AccountBoxIcon />} />
                                    <BottomNavigationAction label="Content" icon={<LibraryBooksIcon />} />
                                </BottomNavigation>
                                <hr className="filter_header"></hr>
                                <div>
                                {this.state.main_value===0 && <FormGroup row className="radio_set">
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 1}
                                                onChange={this.setSubValue(1)}
                                                value="val_full_name"
                                            />
                                        }
                                        label="Name"
                                    /><hr className="filter_header"></hr>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 0}
                                                onChange={this.setSubValue(0)}
                                                value="val_username"
                                            />
                                        }
                                        label="Username"
                                    />
                                </FormGroup>}
                                </div>
                                <div>
                                {this.state.main_value === 1 && <FormGroup row className="radio_set">
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 2}
                                                onChange={this.setSubValue(2)}
                                                value="val_all_possible"
                                            />
                                        }
                                        label="All"
                                        /><hr className="filter_header"></hr>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 3}
                                                onChange={this.setSubValue(3)}
                                                value="val_exact_name"
                                            />
                                        }
                                        label="Exact"
                                    /><hr className="filter_header"></hr>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 4}
                                                onChange={this.setSubValue(4)}
                                                value="val_only_answered"
                                            />
                                        }
                                        label="Answered"
                                    /><hr className="filter_header"></hr>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 5}
                                                onChange={this.setSubValue(5)}
                                                value="val_only_unanswered"
                                            />
                                        }
                                        label="Unanswered"
                                    /><hr className="filter_header"></hr>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                color="primary"
                                                className="filter_checkbox"
                                                checked={this.state.sub_value === 6}
                                                onChange={this.setSubValue(6)}
                                                value="val_only_topics"
                                            />
                                        }
                                        label="Topics"
                                    />
                                </FormGroup>}
                                </div>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                <div className="search_answers">
                    {this.state.hasCome?
                    <AllResults data={this.state.data} main={this.state.main_value} />
                    :<CircularProgress size={32} className="color-theme center_of_page"/>}
                </div>
                </Grid>
                <FooterBar/>
                </Grid>
            </div>
        )
    }
}

export default Search;