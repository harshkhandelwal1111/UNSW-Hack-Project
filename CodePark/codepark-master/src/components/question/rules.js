import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Rules extends Component {
	render() {
		return(
			<Paper className="paper sticky">
			<i><Typography variant="title" className="c-align">Note</Typography><br/>
			<Typography component="p">
				<b>1.</b> Search for the question thoroughly before asking a new one.
			</Typography>
			<Typography component="p">
				<b>2.</b> If a question with the same title exists, it will be rejected.
			</Typography>
			<Typography component="p">
				<b>3.</b> The title can be no longer than 150 characters.
			</Typography>
			<Typography component="p">
				<b>4.</b> The question detail can be <br/>
			      <b>-</b> link to external URL <br/>
	              <b>-</b> a detailed description of the question and expectations of other users <br/>
			      <b>-</b> Any link provided on the website is found to be malicious, the account 
			      will immediately be banned <br/>
			      <b>-</b> Don't use shortened URL <br/>
			</Typography>
			<Typography component="p">
				<b>5.</b> Separate the tags with commas.
			</Typography>
			<Typography component="p">
				<b>6.</b> Use tags related to the topic, add the difficulty level.
			</Typography>
			<Typography component="p">
				<b>7.</b> Better use of tags will increase the probability of question getting answered.
			</Typography>
			<Typography component="p">
				<b>8.</b> We recommend providing testcase as it helps other users verify their answer.
			</Typography>
			<Typography component="p">
				<b>9.</b> Make sure you are respectful to other users.
			</Typography>
			<Typography component="p">
				<b>10.</b> Be kind and ask relevant questions.
			</Typography></i>
			</Paper>
		);
	}
}

export default Rules;