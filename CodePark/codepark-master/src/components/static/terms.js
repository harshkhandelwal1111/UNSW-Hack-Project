import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Navbar from './navbar';
import Footer from '../common/footer';

class Terms extends Component {
	componentDidMount() {
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Terms of Service | CodePark`,
			description : `All our services are free to use but we have certain terms of service based on various laws and we take it very seriously. Please read the terms of service before signing up for your services`,
			url : `https://codepark.in/terms`,
			keywords : `terms of service,codepark,codepark.in,competitive programming,interview preparation,interview questions`
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
				<Navbar/>
				<div className="terms">
					<Typography variant="title" component="h1" className="title big color-black font-normal">
						Terms of Service
					</Typography><hr/><br/><br/>
					<Typography className="font-normal terms-sub-heading" variant="title" component="h1">
						TERMS
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						By accessing this Website, accessible from <a className="navlink-text" href="https://www.codepark.in">
						https://www.codepark.in</a>
						, you are agreeing to be bound by these Website Terms and Conditions of 
						Use and agree that you are responsible for the agreement with any applicable 
						local laws. If you disagree with any of these terms, you are prohibited from 
						accessing this site. The materials contained in this Website are protected by 
						copyright and trade mark law.
					</Typography><br/><br/>
					<Typography className="font-normal terms-sub-heading" variant="title">
						USE LICENSE
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						Permission is granted to temporarily download one copy of the materials on CodePark's 
						Website for personal, non-commercial transitory viewing only. This is the grant of a 
						license, not a transfer of title, and under this license you may not:
						<li>modify or copy the materials;</li>
						<li>use the materials for any commercial purpose or for any public display;</li>
						<li>attempt to reverse engineer any software contained on CodePark's Website;</li>
						<li>remove any copyright or other proprietary notations from the materials; or</li>
						<li>transferring the materials to another person or "mirror" the materials on any other server.
						</li><br/>
						This will let CodePark to terminate upon violations of any of these restrictions. 
						Upon termination, your viewing right will also be terminated and you should destroy
						 any downloaded materials in your possession whether it is printed or electronic format.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">DISCLAIMER</Typography><br/>
					<Typography component="p" className="terms-desc">
						All the materials on CodePark’s Website are provided "as is". CodePark makes no warranties, 
						may it be expressed or implied, therefore negates all other warranties. Furthermore, 
						CodePark does not make any representations concerning the accuracy or reliability of the use 
						of the materials on its Website or otherwise relating to such materials or any sites linked 
						to this Website.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">LIMITATIONS</Typography><br/>
					<Typography component="p" className="terms-desc">
						CodePark or its suppliers will not be hold accountable for any damages that will arise 
						with the use or inability to use the materials on CodePark’s Website, even if 
						CodePark or an authorize representative of this Website has been notified, orally or 
						written, of the possibility of such damage. Some jurisdiction does not allow 
						limitations on implied warranties or limitations of liability for incidental 
						damages, these limitations may not apply to you.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">REVISIONS AND ERRATA</Typography><br/>
					<Typography component="p" className="terms-desc">
						The materials appearing on CodePark’s Website may include technical, typographical, or photographic errors. CodePark will not promise that any of the materials in this Website are accurate, complete, or current. CodePark may change the materials contained on its Website at any time without notice. CodePark does not make any commitment to update the materials.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">LINKS</Typography><br/>
					<Typography component="p" className="terms-desc">
						CodePark has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by CodePark of the site. The use of any linked website is at the user’s own risk.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">SITE TERMS OF USE MODIFICATIONS
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						CodePark may revise these Terms of Use for its Website at any time without prior 
						notice. By using this Website, you are agreeing to be bound by the current version 
						of these Terms and Conditions of Use.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">GOVERNING LAW</Typography><br/>
					<Typography component="p" className="terms-desc">
						Any claim related to CodePark's Website shall be governed by the laws of in without 
						regards to its conflict of law provisions.
					</Typography><br/><br/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Terms;