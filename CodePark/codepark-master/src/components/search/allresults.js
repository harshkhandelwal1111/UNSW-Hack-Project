import React, { Component } from 'react';
import ShowSearch from './showSearch';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

class AllResults extends Component{
    render(){
        // console.log(this.props.data.users)
        let def_img = "https://res.cloudinary.com/codepark-in/image/upload/v1540543932/cp-user-avatars/049-robot-8.png";
        return(
            <div>
            {
                (this.props.main===1 && this.props.data.content.length>0 &&
                <div>
                    {
                        this.props.data.content.map((val,ind)=>(
                            <ShowSearch qname={val.qname} question={val.question} subquestion={val.question_detail}
                                    tags={val.tags} qid={val.uid} />
                        ))
                    }
                </div>)||
                (this.props.main === 0 && this.props.data.users.length > 0 &&
                <div>
                        <Grid container spacing={16}>
                     {
                        this.props.data.users.map((val, ind) => (
                                <Grid item xs={12} sm={6}>
                                    <Paper className="fol_tab_fol1">
                                        <div className="to_fol_profile">
                                            <Grid container spacing={40}>
                                                <Grid item xs={4}>
                                                    <Avatar alt="Username"
                                                        src={(val.profile_image) ? val.profile_image : def_img}
                                                        onClick={() => { window.location.href = `/user/${val.username}` }}
                                                        className="image_in_fol" />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography component="p" className="fol_full_name" onClick={() => { window.location.href = `/user/${val.username}` }}>{val.name.fullName}</Typography>
                                                    <Typography component="p" className="only_grey" onClick={() => { window.location.href = `/user/${val.username}` }}>@{val.username}</Typography>
                                                    <Typography component="p" className="fol_heading">Followers</Typography>
                                                    <Typography component="p" className="fol_num little_left only_grey">{val.number_of_followers}</Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Paper>
                                </Grid>
                        ))
                    }
                </Grid>
                </div>)||
                <div>
                    <Paper className="paper">
                        <Typography variant="headline" component="h4">Nothing to show</Typography>
                    </Paper>
                </div>
            }
            </div>
        )
    }
}

export default AllResults