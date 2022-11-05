import { useState, useEffect } from "react";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Upload from "../upload/Upload";

const Form = (props) => {
  const formik = useFormik({
    initialValues: {
      sleep: "",
      study: "",
    },
    onSubmit: props.submitHandler,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='sleep'>
        How long do you sleep?
        <input id='sleep' name='sleep' type='number' min='0' onChange={formik.handleChange} value={formik.values.sleep} />
        <span>hrs/day</span>
      </label>
      <label htmlFor='study'>
        How long do you study?
        <input id='study' name='study' type='number' min='0' onChange={formik.handleChange} value={formik.values.study} />
        <span>hrs/day</span>
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};
function Home(props) {
  const { eventEntries, setEventEntries } = props;
  const [fixedEvents, setFixedEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);

  useEffect(() => {
    if (otherEvents.length !== 0) {
      alert(JSON.stringify(otherEvents, null, 2));
    }
  }, [otherEvents]);

  //Aggregate form data
  const onSubmit = (values) => {
    const keys = Object.keys(values);
    var i = 0;
    var array = [];
    while (i < keys.length) {
      var key = keys[i];
      var curr = { name: key, time: values[key] };
      array.push(curr);
      i++;
    }
    setOtherEvents(array);
  };

  // test calendar
  const navigate = useNavigate();

  return (
    <>
      <Upload setEventEntries={setEventEntries} />
      {fixedEvents.length === 0 ? (
        <div>
          <Form submitHandler={onSubmit}></Form>
          <button type='button' onClick={() => navigate("/calendar")}>
            Test calendar
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Home;
