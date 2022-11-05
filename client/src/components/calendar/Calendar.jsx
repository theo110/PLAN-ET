import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = (props) => {
  const { eventEntries } = props;
  console.log(eventEntries);

  return (
    <div>
      <FullCalendar plugins={[timeGridPlugin]} initialView='timeGridWeek' events={eventEntries} />
    </div>
  );
};

export default Calendar;
