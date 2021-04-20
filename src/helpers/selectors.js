export function getAppointmentsForDay(state, day) {
  const days = state.days.filter(dayObj => dayObj.name === day);
  if (days.length > 0) {
    const appointments = days[0].appointments.map(id => state.appointments[id])
    return appointments;
  }
  return [];
} 

export function getInterview(state, interview) {
  if (interview !== null) {
    return {
      "student": interview.student,
      "interviewer": {...state.interviewers[interview.interviewer]}
    }
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const days = state.days.filter(dayObj => dayObj.name === day);
  if (days.length > 0) {
    const interviewers = days[0].interviewers.map(id => state.interviewers[id])
    return interviewers;
  }
  return [];
} 