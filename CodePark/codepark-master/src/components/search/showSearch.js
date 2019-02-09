import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { NavLink } from 'react-router-dom';
import Tag from './../profile/tag';

class ShowSearch extends Component {
  render() {
    let subquestion = this.props.subquestion;
    return (
        <div>
          <Paper className="paper search-papers">
            <NavLink to={`/question/view/${this.props.qname}/${this.props.qid}`} className="navlink">
              <Typography variant="title" className="f-bold">
                {this.props.question}
              </Typography>
            </NavLink>
            <div className="center-vert">
              {subquestion && <p dangerouslySetInnerHTML={{ __html: subquestion }} />}
              {/* {subquestion && subquestion.length>100?
              <span>...</span>:''} */}
            {/*subquestion.length>100 && <p className="mleft-half">...</p>*/}
            </div>
            {/* <div className="center-vert row-wrap mtop-one">{chips}</div> */}
            <div className="tags_part_dash">
              {this.props.tags && this.props.tags[0] !== "" &&
                this.props.tags.map((val, ind) => (
                  <Tag tag_name={val} />
                ))
              }
					</div>
          </Paper>
          <br />
          </div>
    );
  }
}

export default ShowSearch;
