import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import earn_img from '../../images/common/earnings.png';
import acti_img from '../../images/common/worker.png';
import help_img from '../../images/common/support.png';
import inte_img from '../../images/common/idea.png';

class Stats extends Component {
    render() {
        return (
            <div id="statistics">
                <Paper className="paper">
                    <Typography component="p" id="user_stats">Statistics</Typography>
                    <br></br>
                    <div className="center-vert">
                        <img src={earn_img} alt="codepark" className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Level: {this.props.level || 0}</Typography></span>
                    </div><br></br>
                    <div className="center-vert">
                        <img src={acti_img} alt="codepark" className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Activeness: {this.props.activeness || 0}</Typography></span>
                    </div><br></br>
                    <div className="center-vert">
                        <img src={help_img} alt="codepark" className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Helpfulness: {this.props.helpfulness || 0}</Typography></span>
                    </div><br></br>
                    <div className="center-vert">
                        <img src={inte_img} alt="codepark" className="marg-one" /> <span><Typography component="p" className="f-bold little_bigger">Intelligence: {this.props.intelligence || 0}</Typography></span>
                    </div><br></br>
                </Paper>
            </div>
        )
    }
}

export default Stats