// Return an array of appointment objects for a specific day.
export function getAppointmentsForDay(state, day) {

  const output = [];

  const dayObj = state.days.find(d => d.name === day);
  
  if (!dayObj) {
    return [];
  }

  for (const id of dayObj.appointments) {
    output.push(state.appointments[id]);
  };

  return output;

};

// Return an array of interviewer objects for a specific day.
export function getInterviewersForDay(state, day) {

  const output = [];

  const dayObj = state.days.find(d => d.name === day);
  
  if (!dayObj) {
    return [];
  }

  for (const id of dayObj.interviewers) {
    output.push(state.interviewers[id]);
  };

  return output;

};

// Return an array of interview objects if a given appointment has an interview scheduled.
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