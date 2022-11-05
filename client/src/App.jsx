import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Bar from "./components/bar/Bar";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const [eventEntries, setEventEntries] = useState([]);

  useEffect(() => {
    console.log(eventEntries);
  }, [eventEntries]);

  return (
    <div>
      <Bar></Bar>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              eventEntries={eventEntries}
              setEventEntries={setEventEntries}
            />
          }
        ></Route>
        <Route
          exact
          path="/calendar"
          element={<Calendar eventEntries={eventEntries} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
