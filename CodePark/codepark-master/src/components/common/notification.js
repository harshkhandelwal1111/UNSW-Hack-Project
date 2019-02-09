import React, { Component } from 'react';
import {Grid, Paper} from '@material-ui/core';
import {ThumbUp} from '@material-ui/icons';

class Notification extends Component {
    // constructor() {
    //     super();
    //     this.state={

    //     }
        // this.getNotification();
    // }
    render() {
        return(
            <div className="notifications">
                <Grid container>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Paper>
                            <ThumbUp/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Notification;