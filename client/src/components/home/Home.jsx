import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Upload from "../upload/Upload";
import { algorithm } from "../../utils/eventSorter";
import { thisSunday, flattenEvents } from "../../utils/momentOperations";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../auth/Loading";

import { Paper, Container, Typography, TextField, Grid, Button, CircularProgress } from "@mui/material";

const Form = (props) => {
    const [customField, setCustomField] = useState([]);
    const [custom, setCustom] = useState("");

    const addEntry = () => {
        const existingTasks = ["sleep", "meal", "study"];
        if (existingTasks.includes(custom)) {
            alert(`Please enter a task other than ${custom}`);
        } else {
            setCustomField([...customField, custom]);
            console.log(customField);
        }
    };

    const formik = useFormik({
        initialValues: {
            sleep: 0,
            study: 0,
            meal: 0,
        },
        onSubmit: props.submitHandler,
    });
    return (
        <Container className='form'>
            <Paper className='paper'>
                <Typography variant='h4' className='formHeader' color='primary'>
                    Enter your weekly plans
                </Typography>
                <form onSubmit={formik.handleSubmit} id='form'>
                    <Grid container className='inputGroup' alignItems='center'>
                        <Grid item xs='5' className='label'>
                            <Typography htmlFor='sleep' justifyContent='center' color='primary'>
                                How long do you sleep?
                            </Typography>
                        </Grid>
                        <Grid item xs='4'>
                            <TextField color='primary' fullWidth id='sleep' name='sleep' type='number' min='0' onChange={formik.handleChange} value={formik.values.sleep} />
                        </Grid>
                        <Grid item xs='2' className='suffix'>
                            <Typography color='secondary'>
                                hrs/day
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className='inputGroup' alignItems='center'>
                        <Grid item xs='5'>
                            <Typography className='label' htmlFor='study' color='primary'>
                                How long do you study?
                            </Typography>
                        </Grid>
                        <Grid item xs='4'>
                            <TextField fullWidth id='study' name='study' type='number' min='0' onChange={formik.handleChange} value={formik.values.study} />
                        </Grid>
                        <Grid item xs='2' className='suffix'>
                            <Typography color='secondary'>
                                hrs/day
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className='inputGroup' alignItems='center'>
                        <Grid item xs='5'>
                            <Typography className='label' htmlFor='meal' color='primary'>
                                How long do spend eating?
                            </Typography>
                        </Grid>
                        <Grid item xs='4'>
                            <TextField fullWidth id='meal' name='meal' type='number' step='any' min='0' onChange={formik.handleChange} value={formik.values.meal} />
                        </Grid>
                        <Grid item xs='2' className='suffix'>
                            <Typography color='secondary'>
                                hrs/day
                            </Typography>
                        </Grid>
                    </Grid>
                    {customField.map((field) => (
                        <Grid container className='inputGroup' alignItems='center'>
                            <Grid item xs='5'>
                                <Typography className='label' htmlFor='custom' color='primary'>
                                    How long do spend on {field}?
                                </Typography>
                            </Grid>
                            <Grid item xs='4'>
                                <TextField fullWidth id={field} name={field} type='number' min='0' onChange={formik.handleChange} value={formik.values[field]} />
                            </Grid>
                            <Grid item xs='2' className='suffix'>
                                <Typography color='secondary'>
                                    hrs/day
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid container className='inputGroup' alignItems='center'>
                        <Grid item xs='4'>
                            <Typography className='label' htmlFor='custom' color='primary'>
                                Add your own custom event:
                            </Typography>
                        </Grid>
                        <Grid item xs='5'>
                            <TextField
                                fullWidth
                                id='custom'
                                name='custom'
                                type='string'
                                onChange={(e) => {
                                    setCustom(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs='2'>
                            <Button onClick={addEntry} variant='contained' className='suffix'>
                                Add field
                            </Button>
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained" fullWidth>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

function Home(props) {
    const { eventEntries, setEventEntries } = props;
    const [fixedEvents, setFixedEvents] = useState([]);
    const [otherEvents, setOtherEvents] = useState([]);
    const navigate = useNavigate();
    const [isFakeLoading, setFakeLoading] = useState(false);

    const delay = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };
    function sortByPriority(otherEvents) {
        const result = [...otherEvents].sort(function (a, b) {
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
            return 0;
        });
        return result;
    }
    function sortByPriority(otherEvents) {
        const result = [...otherEvents].sort(function (a, b) {
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
            return 0
        })
        return result
    }

    useEffect(() => {
        if (otherEvents.length !== 0) {
            console.log(fixedEvents)
            console.log(JSON.stringify(otherEvents));
            var result = algorithm(fixedEvents, otherEvents, thisSunday)
            for (const fixedEvent of flattenEvents(fixedEvents)) {
                result.push(fixedEvent);
            }
            setEventEntries(result);
            setFakeLoading(true)
            delay(3000).then(() => {
                setFakeLoading(false)
                navigate("/calendar")
            })
        }
    }, [otherEvents])

    const testCal = () => {
        setEventEntries(fixedEvents);
        console.log(fixedEvents)
        navigate("/calendar")
    }


    //Aggregate form data
    const onSubmit = (values) => {
        const keys = Object.keys(values);
        var i = 0;
        var array = [];

        var currPriority = 3;
        while (i < keys.length) {
            var priority;
            var key = keys[i];
            switch (key) {
                case "sleep":
                    priority = 0;
                    break;
                case "meal":
                    priority = 1;
                    break;
                case "study":
                    priority = 2;
                    break;
                default:
                    priority = currPriority;
                    currPriority += 1;
            }
            var curr = { name: key, time: values[key], priority: priority };
            array.push(curr);
            i++;
        }
        var sorted = sortByPriority(array);
        setOtherEvents(sorted);
        console.log(otherEvents);
    };

    if (!isFakeLoading) {
        return (
            <div className="container">
                <button type='button' onClick={() => testCal()}>
                    Test calendar
                </button>
                {(Object.keys(fixedEvents).length === 0) ? <Upload setFixedEvents={setFixedEvents} /> : <Form submitHandler={onSubmit}></Form>}
            </div>
        );
    } else {
        return (
            <div className="container2">
                <CircularProgress color="secondary" size='25vh' />
            </div>
        )
    }
}

export default Home;
