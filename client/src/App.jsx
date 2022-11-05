import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Calendar from './components/calendar/Calendar'

function App() {
  return (
    <Routes>
      <Route exact path = "/" element = {<Home/>}></Route>
      <Route exact path = "/calendar" element = {<Calendar/>}></Route>
    </Routes>
  );
}

export default App;

