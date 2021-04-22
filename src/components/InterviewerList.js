import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

function InterviewerList(props) {
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
  {props.interviewers.map(interviewer => <InterviewerListItem 
  key={interviewer.id}
  avatar={interviewer.avatar} 
  name={interviewer.name} 
  selected={props.interviewer === interviewer.id} 
  setInterviewer={() => props.setInterviewer(interviewer.id)}/>)}
  </ul>
</section>
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;
