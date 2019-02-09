import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Navbar from './navbar';
import Footer from '../common/footer';

class About extends Component {

	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `About | CodePark`,
			description : `Learn about CodePark and it's journey. Be a part of the fastest growing community.`,
			url : `https://codepark.in/about`,
			keywords : `about,codepark,codepark.in,competitive programming,interview preparation,interview questions`
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
				<div className="bg-about hr-vr-center">
					<Typography variant="title" className="flex-line main-title">
						{'"Each time we face our fear, we gain strength, courage, and confidence in the doing."'}
					</Typography><br/>
					<Typography component="p" className="flex-line main-subtitle">
						- Theodore Roosevelt
					</Typography>
				</div>
				<div className="main bg-grey">
					<Typography variant="title" component="h1" className="title">
						About Us
					</Typography><hr/><br/>
					<Typography variant="title" component="h5" className="description">
						We are a team of Programmers who have gone through what most of the people go through when they write a program.
                        Programming is an essential part of today's generation, rightly pointed by a few that it wasn't a big deal back when computer 
                        used to be a dumb machine which had to be instructed in assembly language, but those days are long gone, today computers are 
                        capable of producing billions of computation within a short period of time. We understand the implications that it will have in 
                        our lives, small kids are able to design games, robots are becoming citizens of countries, autonomous car will soon be in the market, and 
                        soon we will be in mars.<br/><br/>    
                        We are clearly not moving at the pace we should be moving, there are people who are able to solve 10 problems a day, 
						while others simply keep asking valid questions in platforms like Facebook groups which is not what it is meant for. 
						We have observed that it is the unawareness that is creating a lot of delays, most of the time people don't know what they should do, 
						leave alone what they are doing.
                        The whole point is unless you don't know what to do, how will you do. 
						We are convinced that if a user uses CodePark even 10 minutes a quarter of a day, he will learn more than what he learns in other platforms.
						 <br/><br/>    
                    
                        CodePark is a community of programmers who understand the importance of coding skills and are committed to helping others. 
						Our vision is to create a reliable platform that allows 
                        free sharing of knowledge; where you can ask questions and solve them, learn coding and 
                        help others code, without any restrictions on language, the domain of use.<br/><br/>

                        Competitive programming isn’t just coding, it is coding efficiently, using better algorithms and practices. 
						Here at CodePark, we provide access to thousands of solutions so you can learn better and write solutions to the world’s most difficult problems. 
                        Come be a part of this community!
					</Typography><br/><br/>					
					<NavLink to="/signup" className="flex-c-align navlink">
						<Button className="login-btn">Sign up now!</Button><br/>
					</NavLink><br/>					
				</div>
				<Footer />
			</div>
		);
	}
}

export default About;