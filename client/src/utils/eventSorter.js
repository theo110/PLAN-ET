const sortEvents = (eventEntries) => {
  const chronologicalComparator = (e1, e2) => {
    const [year1, month1, day1, hour1, min1, sec1] = [
      e1.start.substring(0, 4),
      e1.start.substring(4, 6),
      e1.start.substring(6, 8),
      e1.start.substring(9, 11),
      e1.start.substring(11, 13),
      e1.start.substring(13, 15),
    ];
    const [year2, month2, day2, hour2, min2, sec2] = [
      e2.start.substring(0, 4),
      e2.start.substring(4, 6),
      e2.start.substring(6, 8),
      e2.start.substring(9, 11),
      e2.start.substring(11, 13),
      e2.start.substring(13, 15),
    ];
    const e1Start = new Date(year1, month1, day1, hour1, min1, sec1);
    const e2Start = new Date(year2, month2, day2, hour2, min2, sec2);
    return e1Start.getTime() < e2Start.getTime() ? -1 : e1Start.getTime() === e2Start.getTime() ? 0 : 1;
  };
  return eventEntries.sort(chronologicalComparator);
};

export default sortEvents;
