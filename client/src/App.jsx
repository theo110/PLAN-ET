import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";

function App() {
  const [eventEntries, setEventEntries] = useState([]);

  useEffect(() => {
    console.log(eventEntries);
  }, [eventEntries]);

  return (
    <Routes>
      <Route exact path='/' element={<Home eventEntries={eventEntries} setEventEntries={setEventEntries} />}></Route>
      <Route exact path='/calendar' element={<Calendar eventEntries={eventEntries} />}></Route>
    </Routes>
  );
}

export default App;
