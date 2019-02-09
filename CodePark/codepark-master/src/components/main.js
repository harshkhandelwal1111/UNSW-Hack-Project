import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import MainAppbar from './common/mainAppbar';
import Footer from './common/footer';

class Main extends Component {
	componentDidMount() {
		
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `CodePark | Ask, Learn, Code, Share - let everyone learn to code !`,
			description : `A social platform for Programmers, with live events and more. Revolutionize how you learn to code!`,
			url : `https://codepark.in`,
			keywords : `CodePark,coding,competitive programming,interview prepration,coding round prepration,coding events`
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
		return (
			<div>
				<MainAppbar />
				<div className="bg-gradient hr-vr-center">
					<Typography variant="title" className="flex-line main-title">Ask, Learn, Code, Share - Let everyone learn to code.
					</Typography><br/>
					<Typography component="p" className="flex-line main-subtitle">Be a part of the learning revolution</Typography>
				</div>
				<div className="main bg-grey">
					<Typography variant="title" component="h1" className="title">
						CodePark
					</Typography><hr/>
					<Typography variant="title" component="h5" className="description">
						CodePark is a community of programmers with a vision to make learning easy and more 
						engaging. Programming has become a permanent presence in the industry. AI, 
						Machine Learning, IoT, Big Data Analysis, virtually everything technology is evolving 
						into uses coding as its base.<br/><br/>

						First of its kind, CodePark aims to create a better learning environment, with reliable 
						resources and open discussions so that anyone and everyone can participate.
						<br/><br/>

						<NavLink to="/events" className="navlink-text">Live Events</NavLink> at CodePark transforms CodePark into a carnival for programmers with hundreds of Programmers 
						pouring in their efforts to help each other by providing the most optimal solutions to hundreds of budding Programmers.
						Events are more fun as the winners can easily win cash prizes. 
						Events like <NavLink to="/events/COC-ClashOfCodes" className="navlink-text">Clash Of Codes</NavLink> have been a great success.
						<br/><br/>
						
						Here, you can ask questions, learn about various concepts and share your knowledge with others. 
						Programmers at CodePark have shared some of the content that is one of the crucial parts of Programming. 
						CodePark is not only helping users learn concepts like sorting, searching, string manipulations 
						but along with that CodePark has been able to reach the beginners who need basics covered. 
						We have featured questions like <NavLink to="/question/view/Check-the-alphabets/7TqPfXGUY" className="navlink-text"> Check the alphabets </NavLink>,
						<NavLink to="/question/view/Reverse-First-3-Digits/csBNnXcKHg" className="navlink-text"> Reverse First 3 Digits </NavLink>,
						<NavLink to="/question/view/Prime-Zone/SzEOdakAA-" className="navlink-text"> Prime Zone </NavLink>,
						<NavLink to="/question/view/HELP/UmLSECoyvV" className="navlink-text"> Help </NavLink>,
						<NavLink to="/question/view/Step-Pattern/3mSgeUcuqn" className="navlink-text"> Step Pattern </NavLink> , 
						that helps beginners gain confidence and never get stuck, we are here for you, always to pick you when you are down.
						<br/><br/>

						Giving programmers a chance to help other users have made a great impact on Programmers and the better Programmers have been rewarded occasionally 
						for the amount of hard work they have put in to help others. CodePark is the only coding community that allows full access to thousands of programming 
						solutions to learn and grow from. Revolutionize how you learn to code!

					</Typography><br/><br/>
					<Typography variant="title" component="h1" className="c-align">
						Be a part of the change, be a part of CodePark.<br/><br/>						
					</Typography><br/>
					<NavLink to="/signup" className="flex-c-align navlink">
						<Button className="login-btn">Sign up now!</Button><br/>
					</NavLink><br/>
					<Typography variant="title" component="h1" className="c-align grey little_down_in_mobile">
						Already have an account? 
						<NavLink to="/login" className="navlink-text"> Login</NavLink>
					</Typography>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Main;