export function getAppointmentsForDay(state, day) {

  const output = [];

  if (state.days.length === 0) {
    return [];
  }
  
  const appointmentsOutput = Object.values(state.appointments);

  const daysOutput = state.days.filter((dayName) => {

    let appointmentsArray;

    if (dayName.name === day) {
      appointmentsArray = dayName.appointments;
      appointmentsArray.forEach((appointment) => {
        appointmentsOutput.forEach((id) => {
          if (id.id === appointment) {
            output.push(id);
          }
        })
      })
    }

  });

  return output;

}