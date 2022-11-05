import { useState, useEffect } from 'react'
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';

const Form = (props) => {
    const formik = useFormik({
        initialValues: {
            sleep: '',
            study: '',
        },
        onSubmit: props.submitHandler,
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="sleep">How long do you sleep?
                <input
                    id="sleep"
                    name="sleep"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    value={formik.values.sleep}
                />
                <span>hrs/day</span>
            </label>
            <label htmlFor="study">How long do you study?
                <input
                    id="study"
                    name="study"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    value={formik.values.study}
                />
                <span>hrs/day</span>
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}
function Home(props) {
    const [fixedEvents, setFixedEvents] = useState([]);
    const [otherEvents, setOtherEvents] = useState([]);

    useEffect(()=>{
        if(otherEvents.length!==0){
            alert(JSON.stringify(otherEvents, null, 2));
        }
    },[otherEvents])
    
    //Aggregate form data
    const onSubmit = (values) => {
        const keys = Object.keys(values)
        var i = 0
        var array = []
        while(i < keys.length){
            var key = keys[i]
            var curr = { name: key, time: values[key] }
            array.push(curr);
            i++;
        }
        setOtherEvents(array)
    }

    if (fixedEvents.length === 0) {
        return (
            <div>
                <Form submitHandler={onSubmit}></Form>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default Home