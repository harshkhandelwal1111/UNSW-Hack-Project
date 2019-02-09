import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import Tag from './tag.js'

class SelectedTags extends Component {
    render() {
        return (
            <div id="sel_tags">
                <Paper className="paper">
                    <Typography component="p" id="user_tags">Your tags</Typography>
                    {this.props.tags &&
                        this.props.tags.map((val, ind) => (
                            <Tag tag_name={val} />
                        ))
                    }
                </Paper>
            </div>
        )
    }
}

export default SelectedTags