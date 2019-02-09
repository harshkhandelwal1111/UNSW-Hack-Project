import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { SocialIcon } from 'react-social-icons';
import Navbar from './navbar';
import Footer from '../common/footer';

class Contact extends Component {
	componentDidMount() {
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Contact | CodePark`,
			description : `Contact us. We are here to help you guide through any problem that you face on our website.`,
			url : `https://codepark.in/contact`,
			keywords : `conact,codepark,codepark.in,competitive programming,interview preparation,interview questions`
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
				<div className="bg-contact hr-vr-center">
					<Typography variant="title" className="flex-line main-title">
					We are here to help you!
					</Typography><br/>					
				</div>
				<div className="main bg-grey">
					<Typography variant="title" component="h1" className="title">
						Contact Us
					</Typography><hr/><br/><br/>
					<Typography variant="title" className="c-align">
						{"Send us your feedback  "}
						<a href="mailto:feedback@codepark.in" className="navlink-text">
							feedback@codepark.in
						</a>
					</Typography><br/><br/>
					<Typography variant="title" className="c-align">
						{"For any other support  "}
						<a href="mailto:support@codepark.in" className="navlink-text">
							support@codepark.in
						</a>
					</Typography><br/><br/>
					<Typography variant="title" className="c-align">
						{"For more information "}
						<a href="mailto:info@codepark.in" className="navlink-text">
							info@codepark.in
						</a>
					</Typography><br/><br/>
					<Typography variant="title" component="h1" className="c-align">
						We will get in touch with you in a couple of days, thank you for your patience.
					</Typography><br/><br/><br/><br/><br/>
					<Typography variant="title" component="h1" className="c-align">
						Keep In Touch
					</Typography><br/>
					<div className="social-icons">
						<SocialIcon url="https://www.facebook.com/codepark.in" className="social-icon"/>
						<SocialIcon url="https://www.twitter.com/CodePark_in" className="social-icon"/>
						<SocialIcon url="https://www.linkedin.com/company/codepark-in" className="social-icon"/>
						<SocialIcon url="https://www.instagram.com/CodePark_in" className="social-icon"/>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Contact;