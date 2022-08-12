export function getAppointmentsForDay(state, day) {

  const output = [];

  if (state.days.length === 0) {
    return [];
  }
  
  const appointments = Object.values(state.appointments);

  state.days.filter((dayName) => {

    let appointmentsArray;

    if (dayName.name === day) {
      appointmentsArray = dayName.appointments;
      appointmentsArray.forEach((appointment) => {
        appointments.forEach((id) => {
          if (id.id === appointment) {
            return output.push(id);
          }
        });
      });
    }
  });

  return output;

};

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
  
  const outputObj = { student: interview.student };

  const interviewers = Object.values(state.interviewers);

  interviewers.forEach(interviewer => {
    if (interviewer.id === interview.interviewer) {
      outputObj.interviewer = interviewer;
    }
  });
  
  return outputObj;

};