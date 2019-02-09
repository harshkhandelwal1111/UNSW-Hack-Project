import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'

class Tag extends Component {
    render() {
        return (
            <div className="tag little_little_right indi_tag">
                <Typography component="p" className="tag_text">{this.props.tag_name}</Typography>
                {/*<span className="text_bold_600 tag_text">{this.props.tag_name}</span>*/}
            </div>
        )
    }
}

export default Tag