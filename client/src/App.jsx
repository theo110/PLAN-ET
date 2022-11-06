import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Bar from "./components/bar/Bar";
import Loading from "./components/auth/Loading";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [eventEntries, setEventEntries] = useState([]);

  const { isLoading } = useAuth0();

  useEffect(() => {
    console.log(eventEntries);
  }, [eventEntries]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Bar />
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
