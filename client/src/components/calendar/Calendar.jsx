import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css"

const Calendar = (props) => {
  const { eventEntries } = props;
  const dateEventEntries = eventEntries.map((e) => {
    const dateEvent = {
      title: e.title,
      start: e.start.format("YYYY-MM-DD HH:mm:ss"),
      end: e.end.format("YYYY-MM-DD HH:mm:ss"),
    };
    return dateEvent;
  });
  return (
    <div>
      <FullCalendar slotLabelFormat={{hour: 'numeric'}} dayHeaderFormat={{ weekday: 'long' }} allDaySlot={false} plugins={[timeGridPlugin]} initialView='timeGridWeek' events={dateEventEntries} />
    </div>
  );
};

export default Calendar;
