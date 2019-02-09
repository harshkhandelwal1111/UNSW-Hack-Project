import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Navbar from './navbar';
import Footer from '../common/footer';

class Privacy extends Component {
	componentDidMount() {				
		/**
		 * Meta data is required for SEO
		 * -----------------------------
		 */
		let metaData = {
			title : `Privacy Policy | CodePark`,
			description : `Learn about CodePark's Privacy Policy. We are determined to provide our services with most secure channels and we respect your privacy. Please read our privacy policy before signing up for our services`,
			url : `https://codepark.in/privacy`,
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
		return (
			<div>
				<Navbar />
				<div className="terms">
					<Typography variant="title" component="h1" className="title big color-black font-normal">
						Privacy Policy
					</Typography><hr/><br/><br/>
					<Typography component="p" className="terms-desc">
						Effective date: August 01, 2018<br/><br/>
						CodePark ("us", "we", or "our") operates the <a href="https://www.codepark.in" 
						className="navlink-text">https://www.codepark.in</a> website (the "Service").<br/><br/>
						This page informs you of our policies regarding the collection, use, and disclosure 
						of personal data when you use our Service and the choices you have associated with 
						that data.<br/><br/>
						We use your data to provide and improve the Service. By using the Service,
						 you agree to the collection and use of information in accordance with this policy. 
						Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy 
						have the same meanings as in our Terms and Conditions, accessible from 
						<a className="navlink-text" href="https://www.codepark.in"> https://www.codepark.in</a>
					</Typography><br/><br/>
					<Typography className="font-normal terms-sub-heading" variant="title" component="h1">
						INFORMATION COLLECTION AND USE
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						We collect several different types of information for various purposes to 
						provide and improve our Service to you.						
					</Typography><br/>
					<Typography variant="title" className="terms-sub-heading">
						Types of Data Collected
					</Typography><br/>
					<Typography variant="title" className="sub-sub-heading">
						Personal Data
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						While using our Service, we may ask you to provide us with certain personally 
						identifiable information that can be used to contact or identify you ("Personal Data"). 
						Personally identifiable information may include, but is not limited to:<br/>
						<ul>
							<li>Email address</li>
							<li>First name and last name</li>
							<li>Cookies and Usage Data</li>
						</ul>
					</Typography>
					<Typography variant="title" className="sub-sub-heading">
						Usage Data
					</Typography><br/>
					<Typography component="p" className="terms-desc">
					We may also collect information how the Service is accessed and used ("Usage Data"). 
					This Usage Data may include information such as your computer's Internet Protocol 
					address (e.g. IP address), browser type, browser version, the pages of our Service 
					that you visit, the time and date of your visit, the time spent on those pages, 
					unique device identifiers and other diagnostic data.
					</Typography><br/>
					<Typography variant="title" className="sub-sub-heading">
						Tracking & Cookies Data
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						We use cookies and similar tracking technologies to track the activity on our 
						Service and hold certain information.<br/><br/>
						Cookies are files with small amount of data which may include an anonymous 
						unique identifier. Cookies are sent to your browser from a website and stored 
						on your device. Tracking technologies also used are beacons, tags, and scripts 
						to collect and track information and to improve and analyze our Service.<br/><br/>
						You can instruct your browser to refuse all cookies or to indicate when a cookie 
						is being sent. However, if you do not accept cookies, you may not be able to use 
						some portions of our Service.<br/><br/>
						Examples of Cookies we use:<br/>
						<ul>
							<li><b>Session Cookies.</b> We use Session Cookies to operate our Service.</li><br/>
							<li><b>Preference Cookies.</b> We use Preference Cookies to remember your preferences 
							and various settings.</li><br/>
							<li><b>Security Cookies.</b> We use Security Cookies for security purposes.</li><br/>
						</ul>
					</Typography>
					<Typography className="font-normal terms-sub-heading" variant="title">
						USE OF DATA
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						CodePark uses the collected data for various purposes:<br/>
						<ul>
							<li>To provide and maintain the Service</li>
							<li>To notify you about changes to our Service</li>
							<li>To allow you to participate in interactive features of our Service 
							when you choose to do so</li>
							<li>To provide customer care and support</li>
							<li>To provide analysis or valuable information so that we can improve the Service
							</li>
							<li>To monitor the usage of the Service</li>
							<li>To detect, prevent and address technical issues</li>
						</ul>
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">
						TRANSFER OF DATA
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						Your information, including Personal Data, may be transferred to — and maintained on 
						— computers located outside of your state, province, country or other governmental 
						jurisdiction where the data protection laws may differ than those from your 
						jurisdiction.<br/><br/>
						If you are located outside India and choose to provide information to us, please note 
						that we transfer the data, including Personal Data, to India and process it there.<br/>
						Your consent to this Privacy Policy followed by your submission of such information 
						represents your agreement to that transfer.<br/><br/>
						CodePark will take all steps reasonably necessary to ensure that your data is treated 
						securely and in accordance with this Privacy Policy and no transfer of your Personal 
						Data will take place to an organization or a country unless there are adequate 
						controls in place including the security of your data and other personal information.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">
						DISCLOSURE OF DATA
					</Typography><br/>
					<Typography variant="title" className="sub-sub-heading">
						Legal Requirements
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						CodePark may disclose your Personal Data in the good faith belief that such action 
						is necessary to:<br/>
						<ul>
							<li>To comply with a legal obligation</li>
							<li>To protect and defend the rights or property of CodePark</li>
							<li>To prevent or investigate possible wrongdoing in connection with the Service</li>
							<li>To protect the personal safety of users of the Service or the public</li>
							<li>To protect against legal liability</li>
						</ul>
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">SECURITY OF DATA</Typography><br/>
					<Typography component="p" className="terms-desc">
						The security of your data is important to us, but remember that no method of transmission 
						over the Internet, or method of electronic storage is 100% secure. While we strive to use 
						commercially acceptable means to protect your Personal Data, we cannot guarantee its 
						absolute security.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">SERVICE PROVIDERS</Typography><br/>
					<Typography component="p" className="terms-desc">
						We may employ third party companies and individuals to facilitate our Service 
						("Service Providers"), to provide the Service on our behalf, to perform 
						Service-related services or to assist us in analyzing how our Service is used.<br/><br/>
						These third parties have access to your Personal Data only to perform these tasks 
						on our behalf and are obligated not to disclose or use it for any other purpose.
					</Typography><br/>
					<Typography variant="title" className="sub-sub-heading">Analytics</Typography><br/>
					<Typography component="p" className="terms-desc">
						We may use third-party Service Providers to monitor and analyze the use of our Service.
					</Typography><br/>
					<ul>
						<b><li>Google Analytics</li></b><br/>						
						<Typography component="p" className="terms-desc">
							Google Analytics is a web analytics service offered by Google that tracks and reports 
							website traffic. Google uses the data collected to track and monitor the use of our 
							Service. This data is shared with other Google services. Google may use the collected 
							data to contextualize and personalize the ads of its own advertising network.<br/><br/>
							You can opt-out of having made your activity on the Service available to Google 
							Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents
							 the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing 
							 information with Google Analytics about visits activity.<br/><br/>
							 For more information on the privacy practices of Google, please visit the Google 
							 Privacy & Terms web page: <a href="https://policies.google.com/privacy?hl=en" 
							 className="navlink-text">https://policies.google.com/privacy?hl=en</a>
						</Typography><br/>
						<b><li>Amplitude</li></b><br/>
						<Typography component="p" className="terms-desc">
							Amplitude is a web analytics service. You can visit their Privacy Policy page here:
							<a href="https://amplitude.com/privacy" className="navlink-text"> https://amplitude.com/privacy</a>
						</Typography><br/>
						<b><li>Smartlook</li></b><br/>
						<Typography component="p" className="terms-desc">
							Smartlook is a web analytics service. You can visit their Privacy Policy page here:
							<a href="https://www.smartlook.com/help/privacy-statement" 
							className="navlink-text"> https://www.smartlook.com/help/privacy-statement</a>
						</Typography><br/>
					</ul>
					<Typography variant="title" className="terms-sub-heading">
						LINKS TO OTHER SITES
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						Our Service may contain links to other sites that are not operated by us. If you click 
						on a third party link, you will be directed to that third party's site. We strongly 
						advise you to review the Privacy Policy of every site you visit.<br/><br/>
						We have no control over and assume no responsibility for the content, privacy policies 
						or practices of any third party sites or services.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">
						CHILDREN'S PRIVACY
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						Our Service does not address anyone under the age of 13 ("Children").<br/><br/>
						We do not knowingly collect personally identifiable information from anyone under the 
						age of 18. If you are a parent or guardian and you are aware that your Children has 
						provided us with Personal Data, please contact us. If we become aware that we have 
						collected Personal Data from children without verification of parental consent, we 
						take steps to remove that information from our servers.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">
						CHANGES TO THIS PRIVACY POLICY
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						We may update our Privacy Policy from time to time. We will notify you of any changes 
						by posting the new Privacy Policy on this page.<br/><br/>
						We will let you know via email and/or a prominent notice on our Service, prior to the 
						change becoming effective and update the "effective date" at the top of this Privacy 
						Policy.<br/><br/>
						You are advised to review this Privacy Policy periodically for any changes. Changes 
						to this Privacy Policy are effective when they are posted on this page.
					</Typography><br/><br/>
					<Typography variant="title" className="terms-sub-heading">
						CONTACT US
					</Typography><br/>
					<Typography component="p" className="terms-desc">
						If you have any questions about this Privacy Policy, please contact us:<br/>
						<ul><li>By email: <a href="mailto:support@codepark.in" className="navlink-text">
						support@codepark.in</a></li></ul>
					</Typography><br/>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default Privacy;