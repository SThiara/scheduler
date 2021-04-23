import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Appointment/styles.scss";
import "components/Application.scss";
import "components/DayListItem.scss";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";
import "components/Button.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";

import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
    const schedule = dailyAppointments.map(appt => {
    const interview = getInterview(state, appt.interview);
    return (
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  }) 

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
<DayList days={state.days} day={state.day} setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
