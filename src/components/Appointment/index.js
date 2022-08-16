import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const SAVE_ERROR = "SAVE_ERROR";
const DELETE_ERROR = "DELETE_ERROR";

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );
  
  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(SAVE_ERROR, true));
  };

  function destroy (event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(DELETE_ERROR, true));
  };

  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      { mode === EMPTY && (
        <Empty 
          onAdd={() => {
            transition(CREATE);
          }}
        /> 
      )}
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      { mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back(EMPTY)
          }}
          onSave={save}
        />
      )}
      { mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => {
            back(SHOW)
          }}
          onSave={save}
        />
      )}
      { mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      { mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      { mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel your interview?"
          onCancel={() => back(SHOW)}
          onConfirm={destroy}
        />
      )}
      { mode === SAVE_ERROR && (
        <Error
          message="An error has occurred while saving your interview!"
          onClose={() => transition(CREATE)}
        />
      )}
      { mode === DELETE_ERROR && (
        <Error
          message="An error has occurred while deleting your interview!"
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  );
};