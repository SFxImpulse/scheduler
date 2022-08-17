// Exports and renders the Appointment component. The index for the rest of the appointment components.
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

  // Custom hook useVisualMode:
    // Imports the mode state which determines which state a single interview is at a given time.
    // The transition function which changes the mode state.
    // The back function which skips over modes and returns to a previous mode.
    // By default is either in the SHOW or EMPTY mode based on the value of props.interview.
  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );
  
  // Saves the interview object to an appointment object using the bookInterview function. 
    // Then transitions to the SHOW mode upon successful save to the API database.
    // Or transitions to SAVING_ERROR mode upon unsuccessful save.
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

  // Deletes an existing interview object from an appointment object using the cancelInterview function.
    // Then transitions to the EMPTY mode upon successful deleting from the API database.
    // Or transitions to DELETE_ERROR mode upon unsuccessful deletion.
  function destroy (event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(DELETE_ERROR, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
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