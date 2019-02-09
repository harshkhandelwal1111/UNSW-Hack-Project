import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import RecentFeed from './dashboard/recentFeed';
import Unanswered from './dashboard/unanswered';
import Main from './main';
import Login from './login';
import SignUp from './signup/signup';
import About from './static/about';
import Contact from './static/contact';
import Terms from './static/terms';
import Privacy from './static/privacy';
import Tendays from './static/tendays';
import ForgotPass from './forgotPass';
import ResetPass from './resetPass';
import Question from './question/question';
import QuesView from './quesView/quesView';
// import ShowAnswer from './answer/showAnswer';
import Answer from './answer/answer';
import Cookie from './cookie';
import {Profile} from './profile/profile';
import ChangeProfilePicture from './profile/changeProfilePicture'
import Events from './events/events.js';
import Leaderboard from './events/leaderboard.js';
import OneEvent from './events/each_event.js'
import {FirstLogin} from './firstLogin';
import Search from './search/search';
import Authorized from './Authorized';
import Notifs from './notifs_page/notifs'
import Error404 from './404';

class Router extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
				{!Cookie.getCookie('CP') &&
					<Switch>
						<Route path ="/" component={Main} exact/>
						<Route path ="/login" component={Login} history={this.props.history} exact/>
						<Route path="/forgotpass" component={ForgotPass} />
						<Route path="/passwordReset/:token" component={ResetPass} />
						<Route path="/signup" component={SignUp} />
                        <Route path="/auth/verifyMail/" component={Authorized} />
						<Route path="/about" component={About} />
						<Route path="/contact" component={Contact} />
						<Route path="/terms" component={Terms} />
						<Route path="/privacy" component={Privacy} />
						<Route path="/tendays" component={Tendays} />
						<Route path="/question/view/:qname/:qid" component={QuesView} />
						<Route path="/events/:name" component={OneEvent} exact />
						<Route path="/events" component={Events} exact />
						<Route exact path ="/logout" render={() => (
							<Redirect to="/" />
						)}/>
					</Switch>
				}
				{Cookie.getCookie('CP') &&
					<Switch>
						<Route path="/" exact component={Dashboard}/>
						<Route exact path="/login" render={() => (
								<Redirect to="/dashboard"/>
						)}/>
						{/* <Route path="/search?query=querytext" component={Search} /> */}
						<Route path="/search" component={Search} />
						<Route path="/dashboard" component={Dashboard} history={this.props.history}/>
						<Route path="/notifications" component={Notifs} />
						<Route path="/firstLogin" component={FirstLogin} />
						<Route path="/question" component={Question} exact/>
						<Route path="/questions/recent" component={RecentFeed} exact/>
						<Route path="/questions/unanswered" component={Unanswered} exact/>
						{/* <Route path="/showAnswer" component={ShowAnswer} /> */}
						<Route path="/answer/:qid" component={Answer} />
						<Route path="/question/view/:qname/:qid" component={QuesView} />
						<Route exact path="/user/:username" component={Profile} />
						<Route path="/about" component={About} />
						<Route path="/contact" component={Contact} />
						<Route path="/terms" component={Terms} />
						<Route path="/privacy" component={Privacy} />
						<Route path="/tendays" component={Tendays} />
						<Route path="/events/:name" component={OneEvent} exact />
						<Route path="/events/:name/progress" component={Leaderboard} exact />
						<Route path="/events" component={Events} exact/>
						<Route path="/user/:username/changeProfilePicture" component={ChangeProfilePicture} exact />
						<Route path="*" component={Error404} />
					</Switch>
				}
                    {/* <Route path="/auth/verifyMail/" component={Authorized} /> */}
				</div>
			</BrowserRouter>
		);
	}
};

export default Router;
