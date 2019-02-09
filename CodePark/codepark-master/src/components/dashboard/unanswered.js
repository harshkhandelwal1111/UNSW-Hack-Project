import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import PrimarySearchAppBar from '../common/appbar';
import ShowFeed from './showFeed';
import FooterBar from '../common/footerBar';

class Unanswered extends Component {
    
	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Questions you can Answer | CodePark`,
			description : `Latest questions on CodePark that we think you can answer`,
			url : `https://codepark.in/questions/unanswered`,
			keywords : `CodePark,coding,competitive programming,interview prepration,coding round prepration,recent questions,unanswered questions`
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
    render() {
        console.log(this.props.match.params);
        return(
            <div className="bg-grey">
                <PrimarySearchAppBar history = {this.props.history}/><br></br>
                <Grid container spacing={24} className="dashboard">
                    <Grid item lg={2} md={2} className="hide-smr"></Grid>
                    <Grid item lg={8} md={8} sm={12} xs={12} className="no_pad_in_mobile">
						<ShowFeed history={this.props.history}/>
                        <FooterBar/>
					</Grid>
                </Grid>
            </div>
        );
    }
}

export default Unanswered;