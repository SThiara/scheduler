import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE));
    /* props.bookInterview(props.id, interview);
    setTimeout(() => {transition(SHOW)}, 300); */
  }

  function cancel() {
    transition(SAVE);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE));
  }

  return <article className="appointment">
    <Header time={props.time} />
    {mode === CONFIRM && <Confirm message={"Are you sure about that?"} onConfirm={() => cancel()} onCancel={() => back()}/>}
    {mode === ERROR_SAVE && <Error onClose={() => transition(EDIT, true)} message={"Error in saving!"}/>}
    {mode === ERROR_DELETE && <Error onClose={() => transition(SHOW, true)} message={"Error in deleting!"}/>}
    {mode === SAVE && <Status message={"Saving/deleting..."} />}
    {mode === EMPTY && <Empty key={props.id} onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        key={props.id}
        id={props.id}
        student={props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && <Form 
    key={props.id}
    id={props.id}
    interviewers={props.interviewers} 
    onCancel={() => transition(SHOW, true)}
    onSave={save}
    />}
    {mode === EDIT && <Form 
    key={props.id}
    id={props.id}
    interviewers={props.interviewers} 
    name={props.interview && props.interview.student} // should be student=
    interviewer={props.interview && props.interview.interviewer.id}
    onCancel={() => transition(SHOW, true)}
    onSave={save}
    />}
    </article>
    //{props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student}/> : <Empty />}
}