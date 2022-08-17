// Main Application component, renders the entire webpage from this file.
import React from "react";

import DayList from "./DayList";
import Appointment from "./Appointment/index";

import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {

  // Retrieving functions from custom hook useApplicationData.
    // the state object representing the current state.
    // The setDay function which sets the state of the day object.
    // The bookInterview function.
    // The cancelInterview function.
  const { 
    state,
    setDay,
    bookInterview,
    cancelInterview 
  } = useApplicationData();

  // Setting interviewers array.
  const interviewers = getInterviewersForDay(state, state.day);

  // Setting appointments array.
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
