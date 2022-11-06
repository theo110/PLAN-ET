import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Calendar from "./components/calendar/Calendar";
import Bar from "./components/bar/Bar";
import Loading from "./components/auth/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fc6d26',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e24329',
    },
    tertiary: {
      main: '#ffffff',
      contrastText: '#e24329'
    }
  },
})

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
