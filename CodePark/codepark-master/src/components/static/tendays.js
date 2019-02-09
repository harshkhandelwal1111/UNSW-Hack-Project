import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navbar from './navbar';
import Footer from '../common/footer';

class Tendays extends Component {
	componentDidMount() {
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `10 Days of Code | CodePark`,
			description : `CodePark conducted an online competitive programming competition 10 
			days of Code with an aim to create awareness on the importance of competitive coding 
			and the difficulties it involves.`,
			url : `https://codepark.in/tendays`,
			keywords : `privacy policy,codepark,codepark.in,competitive programming,interview preparation,interview questions`
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
		window.scrollTo(0, 0)
  	}
	render() {
		return(
			<div>
				<Navbar />
				<div className="bg-tendays hr-vr-center">
					<Typography variant="title" className="flex-line main-title">
						{'"The way to get started is to quit talking and start doing."'}
					</Typography><br/>
					<Typography component="p" className="flex-line main-subtitle">
						–Walt Disney, Co-Founder, Disney
					</Typography>
				</div>
				<div className="main bg-grey">
					<Typography variant="title" component="h1" className="title">
						10 Days of Code !
					</Typography><hr/><br/>				
					<Typography variant="title" component="h5" className="description">
						Competitive programming is a mind sport where programmers try to develop solutions 
						to certain problems given with specifications. It is conducted and supported by 
						multinational software companies such as Google and Facebook to judge participants 
						and assess their skills based on time taken to code effective solutions, efficiency 
						and other factors. These events give them access to a talent pool of programmers and 
						helps them choose the best among them.<br/>
						We at CodePark had conducted an online competitive programming competition called 10 
						days of Code with an aim to create awareness on the importance of competitive coding 
						and the difficulties it involves. A simple drill was followed; questions got added to 
						the website everyday and users had to come up with the most optimal solutions.<br/>
						The advantages of participating in competitive programming challenges are as follows:
						<ul>
							<li>Exposes you to skills required to become a good candidate for jobs.</li>
							<li>Improves focus and speed</li>
							<li>Helps you solve complicated problems with speed and efficiency</li>
							<li>Makes you a team player</li>
							<li>Gives you an opportunity to understand the various requirements of the 
							field and helps you prepare for a career in coding</li>
						</ul><br/>
						The event was a successful start for us and it helped us understand the needs of 
						programmers today and how we could solve them.
					</Typography><br/><br/>
				    <Grid container spacing={24}>
				    	<Grid item lg={4} xs={12}>
							<Paper className="tendays-paper">
								<Typography variant="title" className="tendays-paper-big">100+</Typography>
								<Typography variant="title" className="tendays-paper-big">
									Participants
								</Typography>
							</Paper>
						</Grid>
						<Grid item lg={4} xs={12}>
							<Paper className="tendays-paper">
								<Typography variant="title" className="tendays-paper-big">27</Typography>
								<Typography variant="title" className="tendays-paper-big">
									Questions
								</Typography>
							</Paper>
						</Grid>
						<Grid item lg={4} xs={12}>
							<Paper className="tendays-paper">
								<Typography variant="title" className="tendays-paper-big">3</Typography>
								<Typography variant="title" className="tendays-paper-big">
									Winners
								</Typography>
							</Paper>
						</Grid>
					</Grid>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Tendays;