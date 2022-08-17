// Renders and exports the create and edit appointment Form component.
import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form (props) {

  // Defines the state for student, interviewer, and error.
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Resets the state for the student and interviewer
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // Calls props.onCancel to return the value of the reset function upon cancelling the creation of an appointment.
  const cancel = () => {
    props.onCancel(); 
    reset();
  };

  // Validates the states for student and interviewer to display an error if either:
    // The student name input field is empty.
    // An interviewer was not selected.
    // By default, the error state is empty, and the student name and selected interviewer are saved.
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input 
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(event) => {
            setInterviewer(event)
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}