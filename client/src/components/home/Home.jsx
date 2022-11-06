import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Upload from "../upload/Upload";
import Loading from "../loading/Loading";
import { algorithm } from "../../utils/eventSorter";
import { thisSunday, flattenEvents } from "../../utils/momentOperations";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";

import { Paper, Container, Typography, TextField, Grid, Button, CircularProgress } from "@mui/material";
import Typewriter from "typewriter-effect";

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
                <Typography variant='h4' className='formHeader' color='secondary'>
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
                            <TextField color='primary' fullWidth id='sleep' name='sleep' type='number' InputProps={{
                                inputProps: {
                                    max: 24, min: 0
                                }
                            }} onChange={formik.handleChange} value={formik.values.sleep} />
                        </Grid>
                        <Grid item xs='2' className='suffix'>
                            <Typography color='secondary.darker'>
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
                            <TextField fullWidth id='study' name='study' type='number' InputProps={{
                                inputProps: {
                                    max: 24, min: 0
                                }
                            }} onChange={formik.handleChange} value={formik.values.study} />
                        </Grid>
                        <Grid item xs='2' className='suffix'>
                            <Typography color='secondary.darker'>
                                hrs/day
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className='inputGroup' alignItems='center'>
                        <Grid item xs='5'>
                            <Typography className='label' htmlFor='meal' color='primary'>
                                How long do you spend eating?
                            </Typography>
                        </Grid>
                        <Grid item xs='4'>
                            <TextField fullWidth id='meal' name='meal' type='number' step='.01'  onChange={formik.handleChange} value={formik.values.meal} />
                        </Grid>
                        <Grid item xs='2' className='suffix'>
                            <Typography color='secondary.darker'>
                                hrs/meal
                            </Typography>
                        </Grid>
                    </Grid>
                    {customField.map((field) => (
                        <Grid container className='inputGroup' alignItems='center'>
                            <Grid item xs='5'>
                                <Typography className='label' htmlFor='custom' color='primary'>
                                    How long do you spend on {field}?
                                </Typography>
                            </Grid>
                            <Grid item xs='4'>
                                <TextField fullWidth id={field} name={field} type='number' InputProps={{
                                    inputProps: {
                                        max: 24, min: 0
                                    }
                                }} onChange={formik.handleChange} value={formik.values[field]} />
                            </Grid>
                            <Grid item xs='2' className='suffix'>
                                <Typography color='secondary.darker'>
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

            var isError = false;
            if (Number.isInteger(result[0])) {
                isError = true;
                if (result[0] > 6) {
                    console.log("meal error")
                    console.log(result[0] - 7)
                } else {
                    console.log("scheduling error")
                    console.log(result[0])
                }
            }
            for (const fixedEvent of flattenEvents(fixedEvents)) {
                result.push({ ...fixedEvent, backgroundColor: "#e24329" });
            }
            setEventEntries(result);
            setFakeLoading(true)
            delay(1000).then(() => {
                setFakeLoading(false)
                if (!isError) {
                    navigate("/calendar")
                }else{

                }
            })

        }
    }, [otherEvents])


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
    const { isAuthenticated } = useAuth0();
    if (!isFakeLoading) {
        if (isAuthenticated === true) {
            return (
                <div className="container">
                    {Object.keys(fixedEvents).length === 0 ? (
                        <Upload setFixedEvents={setFixedEvents} />
                    ) : (
                        <Form submitHandler={onSubmit}></Form>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <div className="container3">
                        <div className="left">
                            <Typography className="rightt" variant='h2' color='secondary'>
                                Plan your:
                            </Typography>
                        </div>

                        <div className="right">
                            <Typography className="leftt" variant='h2' color='primary'>
                                <Typewriter
                                    options={{
                                        autoStart: true,
                                        loop: true,
                                        delay: 0,
                                        strings: [
                                            "academic career.",
                                            "week.",
                                            "daily life.",
                                        ]
                                    }}
                                >
                                </Typewriter>
                            </Typography>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="alignplus">
                        <div className="align">
                            <Typography className="fullw" variant='h5' color='secondary.darker'>
                                PLAN-ET allows you to conveniently plan out weekly schedules hassle free
                            </Typography>
                        </div>
                        <div className="align">
                            <Typography className="fullw" variant='h5' color='primary'>
                                1. Login/Create a free account
                            </Typography>
                        </div>
                        <div className="align">
                            <Typography className="fullw" variant='h5' color='primary'>
                                2. Upload your class schedule
                            </Typography>
                        </div>
                        <div className="align">
                            <Typography className="fullw" variant='h5' color='primary'>
                                3. Fill out your weekly plans
                            </Typography>
                        </div>
                    </div>
                </div >
            )
        }
    } else {
        return (
            <Loading></Loading>
        )
    }
}

export default Home;
