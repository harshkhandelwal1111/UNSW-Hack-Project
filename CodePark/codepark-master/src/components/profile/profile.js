import React, { Component } from 'react';
import PrimarySearchAppBar from '../common/appbar';
import DataIn from './datain.js'

class Profile extends Component {
    componentDidMount() {
        document.title = this.props.match.params.username + ` | CodePark`;
    }
    render() {
        return (
            <div className="whole">
                <PrimarySearchAppBar />
                <DataIn
                history={this.props.history} 
                username={this.props.match.params.username}
                />
            </div>
        )
    }
}

export { Profile }