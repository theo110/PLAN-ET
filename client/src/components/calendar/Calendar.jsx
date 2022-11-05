import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import sortEvents from "../../utils/eventSorter";

const Calendar = (props) => {
  const { eventEntries } = props;
  console.log("eventEntries:");
  console.log(eventEntries);

  const testEntries = [
    {
      end: "20211028T040000Z",
      start: "20211028T030000Z",
      title: "SPCOM ,peer review",
    },
    { end: "20220126T020000Z", start: "20220126T010000Z", title: "Clas104 term test1" },

    { end: "20220216T020000Z", start: "20220216T010000Z", title: "CLAS test" },

    { end: "20221105T200000Z", start: "20221105T190000Z", title: "STATS lecture" },

    { end: "20221104T203000Z", start: "20221104T193000Z", title: "STATS TUT" },
  ];

  console.log(sortEvents(testEntries));

  return (
    <div>
      <FullCalendar plugins={[timeGridPlugin]} initialView='timeGridWeek' events={eventEntries} />
    </div>
  );
};

export default Calendar;
