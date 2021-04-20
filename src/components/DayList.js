import React from "react";
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  return <ul>
    {props.days.map(dayItem => <DayListItem key= {dayItem.id} id={dayItem.id} name={dayItem.name} spots={dayItem.spots} selected={dayItem.name === props.day} setDay={props.setDay} />)}
  </ul>;
}