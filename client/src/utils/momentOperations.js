import moment from "moment";

export const thisSunday = moment().startOf("week");

export const transposeToThisWeek = (date) => {
  const offset = date - date?.clone()?.startOf("week");
  const newDate = moment(thisSunday + offset);
  return newDate;
};

export const splitEventsByDay = (events) => {
  let result = [[], [], [], [], [], [], []];
  events.forEach((e) => {
    const transPosedEvent = {
      title: e.title,
      start: transposeToThisWeek(e.start),
      end: transposeToThisWeek(e.end),
    };
    result[transPosedEvent.start?.day()]?.push(transPosedEvent);
  });
  return result;
};

export const flattenEvents = (weekOfEvents) => {
  let result = [];
  for (const day of weekOfEvents) {
    for (const e of day) {
      if (e) {
        result.push(e);
      }
    }
  }
  return result;
};

export const incrementBy = (date, hours) => {
  return date?.clone().add(hours, "hours");
};

export const hourDifferenceBetweenDates = (d1, d2) => {
  return d1?.diff(d2, "hours", true);
};

export const toDayOfWeek = (n) => {
  let weekday = [];
  weekday[0] = "Monday";
  weekday[1] = "Tuesday";
  weekday[2] = "Wednesday";
  weekday[3] = "Thursday";
  weekday[4] = "Friday";
  weekday[5] = "Saturday";
  weekday[6] = "Sunday";
  return weekday[n];
};
