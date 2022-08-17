import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Assigns state object, and setState function.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // Dynamically updates the spots remaining for each day.
  const updateSpots = (day, days, appointments) => {
    const foundDay = days.find((d) => d.name === day);

    if (!foundDay) {
      return 0;
    }

    let count = 0;

    for (const id of foundDay.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count += 1;
      }
    }

    const newDay = { ...foundDay, spots: count };
    const newDays = days.map((d) => (d.name === day ? newDay : d));

    return newDays;
  };

  // Other solution
  /* 
  
  const updateSpots = (state, appointments, id) => {

    const dayObj = state.days.find(d => d.name === state.day);

    let spots = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots += 1;
      }
    }

    const newDay = {...dayObj, spots};
    const newDays = state.days.map(d => d.name === state.day ? newDay : d)

    return days;
    
  };

    */

  // Defines setDay function as to set the state of the current day.
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // Retrieves data from multiple APIs.
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // Makes an axios put request to assign an interview object to an appointment object.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // Calls the return value for updateSpots.
      const newDays = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  // Makes an axios delete request to delete an interview object from an appointment object.
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const newDays = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
