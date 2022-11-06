import { incrementBy, hourDifferenceBetweenDates } from "./momentOperations";

export const sortEvents = (eventEntries) => {
  const chronologicalComparator = (e1, e2) => {
    return e1.start < e2.start ? -1 : e1.start === e2.start ? 0 : 1;
  };
  return eventEntries.sort(chronologicalComparator);
};

export const getPotential = (events, start, end) => {
  let potential = [];
  let current = start;
  for (let i = 0; i < events.length && current < end; ++i) {
    var startDate = events[i].start;
    var endDate = events[i].end;
    if (current < startDate) {
      potential.push([current, startDate]);
      current = endDate;
    } else if (current < endDate) {
      current = endDate;
    }
  }
  if (current < end) potential.push([current, end])
  return potential;
};

export const algorithm = (fixedEvents, freeEvents, start) => {
  var allEvents = [];
  var allPotentials = [];
  for (var i = 0; i < 7; i++) {
    allPotentials.push(getPotential(fixedEvents[i], incrementBy(start, 24 * i), incrementBy(start, 24 * (i + 1))));
    console.log(allPotentials)
  }

  //Iterate through each day

  for (var i = 0; i < 7; i++) {
    //Sleep Time
    var compliment = (i == 0) ? 6 : i - 1;
    //12 - x not enough
    if (hourDifferenceBetweenDates(allPotentials[i][0][1], allPotentials[i][0][0]) < freeEvents[0].time) {
      //Subtract time from current day
      allEvents.push({ title: freeEvents[0].name, start: allPotentials[i][0][0], end: allPotentials[i][0][1] })

      var carry = freeEvents[0].time - hourDifferenceBetweenDates(allPotentials[i][0][1], allPotentials[i][0][0])
      allPotentials[i].splice(0, 1)

      //Check time at previous night
      if (hourDifferenceBetweenDates(allPotentials[compliment][allPotentials[compliment].length - 1][1], allPotentials[compliment][allPotentials[compliment].length - 1][0]) < carry) {
        //If not possible, then can't sleep
        console.log("???")
        return [];
      } else {
        //Subtract time from night
        allEvents.push({ title: freeEvents[0].name, start: incrementBy(allPotentials[compliment][allPotentials[compliment].length - 1][1], -carry), end: allPotentials[compliment][allPotentials[compliment].length - 1][1] })
        allPotentials[compliment][allPotentials[compliment].length - 1][1] = incrementBy(allPotentials[compliment][allPotentials[compliment].length - 1][1], carry);
      }
    } else {
      //Can sleep 12 - x 
      allEvents.push({ title: freeEvents[0].name, start: allPotentials[i][0][0], end: incrementBy(allPotentials[i][0][0], freeEvents[0].time) })
      allPotentials[i][0][0] = incrementBy(allPotentials[i][0][0], freeEvents[0].time);
    }
  }

  for (var i = 0; i < 7; i++) {

    //Meal Time
    //Breakfast
    console.log(freeEvents[1])
    let j = 0;
    let found = false;
    for (; j < allPotentials[i].length && incrementBy(allPotentials[i][j][0], freeEvents[1].time).hour <= 10; ++j) {
      if (hourDifferenceBetweenDates(allPotentials[i][j][1], allPotentials[i][j][0]) >= freeEvents[1].time) {
        allEvents.push({ title: freeEvents[1].name, start: allPotentials[i][j][0], end: incrementBy(allPotentials[i][j][0], freeEvents[1].time) });
        allPotentials[i][j][0].hours += freeEvents[1].time;
        found = true;
        break;
      }
    }
    if (!found) {
      //throw error
    }
    found = false;
    //Lunch
    for (
      ;
      j < allPotentials[i].length &&
      (allPotentials[i][j][0].hour >= 11 ||
        incrementBy(allPotentials[i][j][1], -freeEvents[1].time).hour >= 11) &&
      incrementBy(allPotentials[i][j][0], freeEvents[1].time).hour <= 2;
      ++j
    ) {
      if (
        hourDifferenceBetweenDates(
          allPotentials[i][j][1],
          allPotentials[i][j][0]
        ) >= freeEvents[1].time
      ) {
        if (allPotentials[i][j][0].hours >= 11) {
          allEvents.push({ title: freeEvents[1].name, start: allPotentials[i][j][0], end: incrementBy(allPotentials[i][j][0], freeEvents[i].time) });
          allPotentials[i][j][0].hours += freeEvents[1].time;
        } else {
          allEvents.push({ title: freeEvents[1].name, start: incrementBy(allPotentials[i][j][1], -freeEvents[1].time), end: allPotentials[i][j][1] });
          allPotentials[i][j][1].hours -= freeEvents[1].time;
        }
        found = true;
        break;
      }
    }
    if (!found) {
      //throw error
    }
    found = false;
    //Dinner
    for (; j < allPotentials[i].length && allPotentials[i][j][0].hours >= 5; ++j) {
      if (hourDifferenceBetweenDates(allPotentials[i][j][1], allPotentials[i][j][0]) >= freeEvents[1].time) {
        allEvents.push({ title: freeEvents[1].name, start: allPotentials[i][j][0], end: incrementBy(allPotentials[i][j][0], freeEvents[i].time) });
        allPotentials[i][j][0].hours += freeEvents[1].time;
        found = true;
        break;
      }
    }
    if (!found) {
      //throw eror
    }

  }

  //Other
  for (var i = 0; i < 7; i++) {
    for (var k = 2; k < freeEvents.length; k++) {
      if (freeEvents[k].time === 0) continue;
      var eventTime = freeEvents[k].time

      for (var l = 0; l < allPotentials[i].length; l++) {
        //Split up event
        console.log(freeEvents[k].time)
        if (
          hourDifferenceBetweenDates(
            allPotentials[i][l][1],
            allPotentials[i][l][0]
          ) < freeEvents[k].time
        ) {
          //Make sure end - start = allPotenials[i][l][1] - allPotentials[i][l][0]
          if (allPotentials[i][l][1] - allPotentials[i][l][0] == 0) continue;
          allEvents.push({ title: freeEvents[k].name, start: allPotentials[i][l][0], end: allPotentials[i][l][1] })
          freeEvents[k].time -= hourDifferenceBetweenDates(allPotentials[i][l][1], allPotentials[i][l][0]);
          allPotentials[i][l][0] = allPotentials[i][l][1];
        }
        //Period > time
        else {
          //Make sure end - start = freeEvents[k].time
          allEvents.push({ title: freeEvents[k].name, start: allPotentials[i][l][0], end: incrementBy(allPotentials[i][l][0], freeEvents[k].time) })
          allPotentials[i][l][0] = incrementBy(allPotentials[i][l][0], freeEvents[k].time)
          freeEvents[k].time = 0;
          break;
        }
      }
      if (freeEvents[k].time > 0) {
        console.log(freeEvents[k].time)
        console.log("can'tfit")
        return []
      }
      freeEvents[k].time = eventTime;
    }
  }
  console.log("executes normally?")
  console.log(allEvents)
  return sortEvents(allEvents);
}