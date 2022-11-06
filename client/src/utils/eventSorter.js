import { incrementBy, hourDifferenceBetweenDates } from "./momentOperations";

export const sortEvents = (eventEntries) => {
  const chronologicalComparator = (e1, e2) => {
    return e1.start < e2.start ? -1 : e1.start === e2.start ? 0 : 1;
  };
  return eventEntries.sort(chronologicalComparator);
};

const sleepColor = "#fca326";

export const getPotential = (events, start, end) => {
  let potential = [];
  let current = start;
  for (let i = 0; i < events.length && current < end; ++i) {
    let startDate = events[i].start;
    let endDate = events[i].end;
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
  let allEvents = [];
  let allPotentials = [];
  for (let i = 0; i < 7; i++) {
    allPotentials.push(getPotential(fixedEvents[i], incrementBy(start, 24 * i), incrementBy(start, 24 * (i + 1))));
    console.log(allPotentials)
  }

  //Iterate through each day

  for (let i = 0; i < 7; i++) {
    //Sleep Time
    let compliment = (i === 0) ? 6 : i - 1;
    //12 - x not enough
    if (hourDifferenceBetweenDates(allPotentials[i][0][1], allPotentials[i][0][0]) < freeEvents[0].time) {
      //Subtract time from current day
      allEvents.push({ title: freeEvents[0].name, start: allPotentials[i][0][0], end: allPotentials[i][0][1], backgroundColor: sleepColor })

      let carry = freeEvents[0].time - hourDifferenceBetweenDates(allPotentials[i][0][1], allPotentials[i][0][0])
      allPotentials[i].splice(0, 1)

      //Check time at previous night
      if (hourDifferenceBetweenDates(allPotentials[compliment][allPotentials[compliment].length - 1][1], allPotentials[compliment][allPotentials[compliment].length - 1][0]) < carry) {
        //If not possible, then can't sleep
        console.log("???")
        return [i];
      } else {
        //Subtract time from night
        allEvents.push({ title: freeEvents[0].name, start: incrementBy(allPotentials[compliment][allPotentials[compliment].length - 1][1], -carry), end: allPotentials[compliment][allPotentials[compliment].length - 1][1], backgroundColor: sleepColor })
        allPotentials[compliment][allPotentials[compliment].length - 1][1] = incrementBy(allPotentials[compliment][allPotentials[compliment].length - 1][1], carry);
      }
    } else {
      //Can sleep 12 - x 
      allEvents.push({ title: freeEvents[0].name, start: allPotentials[i][0][0], end: incrementBy(allPotentials[i][0][0], freeEvents[0].time), backgroundColor: sleepColor })
      allPotentials[i][0][0] = incrementBy(allPotentials[i][0][0], freeEvents[0].time);
    }
  }
  if (freeEvents[1].time > 0) {
    for (let i = 0; i < 7; i++) {
      //Meal Time
      //Breakfast
      console.log("MEALS")
      console.log(freeEvents[1])
      var missedMeal = 0;
      let j = 0;
      let found = false;
      for (; j < allPotentials[i].length && incrementBy(allPotentials[i][j][0], freeEvents[1].time).hour() <= 11; ++j) {
        if (hourDifferenceBetweenDates(allPotentials[i][j][1], allPotentials[i][j][0]) >= freeEvents[1].time) {
          allEvents.push({ title: "breakfast", start: allPotentials[i][j][0], end: incrementBy(allPotentials[i][j][0], freeEvents[1].time) });
          allPotentials[i][j][0] = incrementBy(allPotentials[i][j][0], freeEvents[1].time);
          found = true;
          break;
        }
      }
      if (!found) {
        console.log("breakfast not found");
        missedMeal ++;
      }
      found = false;
      //Lunch
      for (; j < allPotentials[i].length && incrementBy(allPotentials[i][j][0], freeEvents[1].time).hour() <= 14; ++j) {
        console.log(allPotentials[i][j]);
        if (
          hourDifferenceBetweenDates(allPotentials[i][j][1], allPotentials[i][j][0]) >= freeEvents[1].time) {
          if (allPotentials[i][j][0].hour() >= 11) {
            allEvents.push({ title: "lunch", start: allPotentials[i][j][0], end: incrementBy(allPotentials[i][j][0], freeEvents[1].time) });
            allPotentials[i][j][0] = incrementBy(allPotentials[i][j][0], freeEvents[1].time);
            found = true;
            break;
          } else if (incrementBy(allPotentials[i][j][1], -freeEvents[1].time).hour() >= 11) {
            let startTime = incrementBy(allPotentials[i][j][1], -incrementBy(allPotentials[i][j][1], -11).hour());
            allEvents.push({ title: "lunch", start: startTime, end: incrementBy(startTime, freeEvents[1].time) });
            let endTime = allPotentials[i][j][1];
            allPotentials[i][j][1] = startTime;
            allPotentials[i].splice(j + 1, 0, [incrementBy(startTime, freeEvents[1].time), endTime]);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        console.log("lunch not found");
        missedMeal ++;
      }
      found = false;
      //Dinner
      for (; j < allPotentials[i].length; ++j) {
        console.log(allPotentials[i][j]);
        if (hourDifferenceBetweenDates(allPotentials[i][j][1], allPotentials[i][j][0]) >= freeEvents[1].time) {
          if (allPotentials[i][j][0].hour() >= 17) {
            allEvents.push({ title: "dinner", start: allPotentials[i][j][0], end: incrementBy(allPotentials[i][j][0], freeEvents[1].time) });
            allPotentials[i][j][0] = incrementBy(allPotentials[i][j][0], freeEvents[1].time);
            found = true;
            break;
          } else if (incrementBy(allPotentials[i][j][1], -freeEvents[1].time).hour() >= 17) {
            let startTime = incrementBy(allPotentials[i][j][1], -incrementBy(allPotentials[i][j][1], -17).hour());
            allEvents.push({title: "dinner", start: startTime, end: incrementBy(startTime, freeEvents[1].time)});
            let endTime = allPotentials[i][j][1];
            allPotentials[i][j][1] = startTime;
            allPotentials[i].splice(j + 1, 0, [incrementBy(startTime, freeEvents[1].time), endTime]);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        console.log(allEvents);
        console.log("dinner not found");
        missedMeal ++;
      }
      if(missedMeal >= 2){
        return [i+7]
      }
    }
  }

  //Other
  for (let i = 0; i < 7; i++) {
    for (let k = 2; k < freeEvents.length; k++) {
      if (freeEvents[k].time === 0) continue;
      let eventTime = freeEvents[k].time

      for (let l = 0; l < allPotentials[i].length; l++) {
        //Split up event
        console.log(freeEvents[k].time)
        if (
          hourDifferenceBetweenDates(
            allPotentials[i][l][1],
            allPotentials[i][l][0]
          ) < freeEvents[k].time
        ) {
          //Make sure end - start = allPotenials[i][l][1] - allPotentials[i][l][0]
          if (allPotentials[i][l][1] - allPotentials[i][l][0] === 0) continue;
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
        return [i]
      }
      freeEvents[k].time = eventTime;
    }
  }
  console.log("executes normally?")
  console.log(allEvents)
  return sortEvents(allEvents);
}