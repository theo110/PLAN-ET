import { incrementBy, hourDifferenceBetweenDates} from "./momentOperations";

const sortEvents = (eventEntries) => {
  const chronologicalComparator = (e1, e2) => {
    return e1.start < e2.start ? -1 : e1.start === e2.start ? 0 : 1;
  };
  return eventEntries.sort(chronologicalComparator);
};

export default sortEvents;

const getPotential = (events, start, end) => {
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
  return potential;
}

const algorithm = (fixedEvents, freeEvents, start) => {
  var allEvents = [];
  var allPotentials = []
  for (var i = 0; i < 7; i++) {
    allPotentials[i].append(getPotential(fixedEvents, incrementBy(start,24*i), incrementBy(start, 24*(i+1))));
    console.log(allPotentials)
  }

  //Iterate through each day
  for (var i = 0; i < 7; i++) {
    //Sleep Time
    var compliment = (i == 0) ? 6 : i - 1;
    //12 - x not enough
    if (hourDifferenceBetweenDates(allPotentials[i][0][1],allPotentials[i][0][0])< fixedEvents[0].time) {
      //Subtract time from current day
      allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[i][0][0], end: allPotentials[i][0][1] })
      fixedEvents[0].time -= hourDifferenceBetweenDates(allPotentials[i][0][1] - allPotentials[i][0][0])
      allPotentials[i].remove()

      //Check time at previous night
      if (hourDifferenceBetweenDates(allPotentials[compliment][allPotentials[compliment].length - 1][1],allPotentials[compliment][allPotentials[compliment].length - 1][0]) < fixedEvents[0].time) {
        //If not possible, then can't sleep
        return [];
      } else {
        //Subtract time from night
        allEvents[i].append({ title: freeEvents[k].name, start: incrementBy(allPotentials[compliment][allPotentials[compliment].length - 1][1],-fixedEvents[0].time), end: allPotentials[compliment][allPotentials[compliment].length - 1][1] })
        allPotentials[compliment][allPotentials[compliment].length - 1][1] = incrementBy(allPotentials[compliment][allPotentials[compliment].length - 1][1],fixedEvents[0].time);
      }
    } else {
      //Can sleep 12 - x 
      allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[i][0][0], end: incrementBy(allPotentials[i][0][0],fixedEvents[0].time)})
      allPotentials[i][0][0] + incrementBy(allPotentials[i][0][0],fixedEvents[0].time);
    }

    //Other
    for (var k = 2; k < freeEvents.length; k++) {
      for (var l = 0; i < allPotentials.length; i++) {
        //Split up event
        if (hourDifferenceBetweenDates(allPotentials[i][l][1],allPotentials[i][l][0])< freeEvents[k].time) {

          //Make sure end - start = allPotenials[i][l][1] - allPotentials[i][l][0]
          allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[i][l][0], end: allPotentials[i][l][1]})
          freeEvents[k].time -= hourDifferenceBetweenDates(allPotentials[i][l][1],allPotentials[i][l][0]);
          allPotentials[i].remove(l);
        }
        //Period > time
        else {
          //Make sure end - start = freeEvents[k].time
          allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[i][l][0], end: incrementBy(allPotentials[i][l][0],freeEvents[k].time)})
          allPotentials[i][l][0] = incrementBy(allPotentials[i][l][0],freeEvents[k].time)
          freeEvents[k].time = 0;
          break;
        }

      }
      if (freeEvents[k].time > 0) return []
    }
  }
  return allEvents;
}