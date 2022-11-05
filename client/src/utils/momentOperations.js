import moment from "moment";

export const splitEventsByDay = (events) => {
  let result = [[], [], [], [], [], [], []];
  events.forEach((e) => {
    result[e.start.day()].push(e);
  });
  return result;
};

export const incrementBy = (date, hours) => {
  return date.clone().add(hours, "hours");
};

export const transposeToThisWeek = (date) => {
  const offset = date - date?.clone()?.startOf("week");
  const newDate = moment(moment() + offset);
  return newDate;
};

export const flattenEvents = (weekOfEvents) => {
  let result = [];
  for (const day of weekOfEvents) {
    for (const e of day) {
      if (e) {
        result.push(transposeToThisWeek(e));
      }
    }
  }
  return result;
};

export const incrementBy = (date, hours) => {
  return date.clone().add(hours, "hours");
};

export const timeDifferenceBetweenDates = (d1, d2) => {
  const offset = d1 - d2;
  return moment(offset);
};
