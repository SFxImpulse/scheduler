import React from 'react';

import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {

  const displayName = () => {
    if (props.selected) {
      return props.name;
    }
  }

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img 
        className={interviewerClass}
        src={props.avatar}
        alt={props.name}
      />
      {displayName()}
    </li>      
  );
}

