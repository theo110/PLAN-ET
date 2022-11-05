import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView='timeGridWeek'
      events={[
        { title: "event 1", start: "2022-11-05T03:24:00", end: "2022-11-05T05:24:00" },
        { title: "event 1", start: "2022-11-05T07:24:00", end: "2022-11-05T12:24:00" },
      ]}
    />
  );
};

export default Calendar;
