import React, { Component } from 'react';

class Tags extends Component {
	state = {
		tags: '',
	}
	render() {
		return(
			<TextField
	          id="tags"
	          label="Tags"
	          className="full-width"
	          value={this.state.name}
	          onChange={this.handleChange('tags')}
	          margin="normal"
	          variant="outlined"
	        />
		);
	}
}