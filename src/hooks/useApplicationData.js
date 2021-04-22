import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
  spots: []
});

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = state.days.map(dayObj => {
    const temp = {...dayObj};
    temp.spots = getSpotsForDay(dayObj, appointments);
    return temp;
  });
  setState(prev =>({
    ...prev,
    appointments,
    days
  })); 
  return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment )
  //.then(response => setState(prev => ({...prev, appointments: response.data})))
};

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
   const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const days = state.days.map(dayObj => {
    const temp = {...dayObj};
    temp.spots = getSpotsForDay(dayObj, appointments);
    return temp;
  });
  setState(prev =>({
    ...prev,
    appointments,
    days
  }));  
  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
};

const setDay = day => setState({ ...state, day });
//const setDay = day => setState(prev => ({ ...prev, day }));

const pullSpots = daysArray => {
  const spotsArray = daysArray.map(day => {
    const container = {};
    container["id"] = day.id;
    container["spots"] = day.spots;
    return container;
  })
  return spotsArray;
};

const getSpotsForDay = function (dayObj, appointments) { // thanks Gary!
  let spots = 0;
  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }
  return spots;
}

useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get(`http://localhost:8001/api/appointments`),
    axios.get(`http://localhost:8001/api/interviewers`)
  ])
  .then(all => {
    setState(prev => (
      { 
        ...prev, 
        days: [...all[0].data], 
        appointments: {...all[1].data}, 
        interviewers: {...all[2].data},
        spots: pullSpots(all[0].data)
      }));
    })
}, []);

return { state, setDay, bookInterview, cancelInterview };

};