import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';

class Chip extends Component {	
	render() {
		return(
			<Chip label={this.props.label}
	        onDelete={this.handleDelete}/>
		);
	}
}

export default Chip;