import { incrementBy } from "./momentOperations";

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
    startDate = events[i].start;
    endDate = events[i].end;
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
    allPotentials[i].append(getPotential(currentEvents, incrementBy(start,24*i), incrementBy(start, 24*(i+1))));
    console.log(allPotentials)
  }

  //Iterate through each day
  for (var i = 0; i < 7; i++) {
    //Sleep Time
    var compliment = (i == 0) ? 6 : i - 1;
    //12 - x not enough
    if (allPotentials[i][0][1] - allPotentials[i][0][0] < fixedEvents[0].time) {
      //Subtract time from current day
      fixedEvents[0].time -= (allPotentials[i][0][1] - allPotentials[i][0][0])
      allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[i][0][0], end: allPotentials[i][0][1] })
      allPotentials[i].remove()

      //Check time at previous night
      if (allPotentials[compliment][allPotentials[compliment].length - 1][1] - allPotentials[compliment][allPotentials[compliment].length - 1][0] < fixedEvent[0].time) {
        //If not possible, then can't sleep
        return [];
      } else {
        //Subtract time from night
        allPotentials[compliment][allPotentials[compliment].length - 1][1] -= fixedEvents[0].time;
        allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[compliment][allPotentials[compliment].length - 1][1] - remaining sleep time, end: allPotentials[compliment][allPotentials[compliment].length - 1][1] })
      }
    } else {
      //Can sleep 12 - x 
      allPotentials[i][0][0] += fixedEvents[0].time;
      allEvents[i].append({ title: freeEvents[k].name, start: allPotentials[i][0][0], end: allPotentials[i][0][0] + sleep Time })
    }
    for (var j = 0; j < allPotentials[i].length; j++) {
      //67, allPotentials[i][j][1] will likely be on a different day
      if (allPotentials[i][j][0].hour() > 22 && allPotentials[i][j][1] - allPotentials[i][j][0] >= freeEvents[0].time) {
        allPotentials[i][j][1] - fixedEvents[0].time;
      }else{
        //Empty schedule means impossible!
        return [];
      }
    }

    //Other
    for (var k = 2; k < freeEvents.length; k++) {
      for (var l = 0; i < allPotentials.length; i++) {
        //Split up event
        if (allPotentials[i][l][1] - allPotentials[i][l][0] < freeEvents[k].time) {

          //Make sure end - start = allPotenials[i][l][1] - allPotentials[i][l][0]
          allEvents[i].append({ title: freeEvents[k].name, start: do your fucking conversion, end: do your fucking conversion })
          freeEvents[k].time -= allPotentials[i][l][1] - allPotentials[i][l][0];
          allPotentials[i].remove(l);
        }
        //Period > time
        else {
          allPotentials[i][l][0] += freeEvents[k].time

          //Make sure end - start = freeEvents[k].time
          allEvents[i].append({ title: freeEvents[k].name, start: do your fucking conversion, end: do your fucking conversion })
          freeEvents[k].time = 0;
          break;
        }

      }
      if (freeEvents[k].time > 0) return []
    }
  }
  return allEvents;
}