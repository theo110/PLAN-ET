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
