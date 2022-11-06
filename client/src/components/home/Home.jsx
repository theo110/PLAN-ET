import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Upload from "../upload/Upload";
import { algorithm } from "../../utils/eventSorter";
import { thisSunday, flattenEvents } from "../../utils/momentOperations";

import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";

const Form = (props) => {
    const [customField, setCustomField] = useState([]);
    const [custom, setCustom] = useState("");

    const addEntry = () => {
        setCustomField([...customField, custom])
        console.log(customField)
    }

    const formik = useFormik({
        initialValues: {
            sleep: 0,
            study: 0,
            meal: 0,
        },
        onSubmit: props.submitHandler,
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit} id="form">
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
                <label htmlFor="meal">How long do typically spend eating?
                    <input
                        id="meal"
                        name="meal"
                        type="number"
                        min="0"
                        onChange={formik.handleChange}
                        value={formik.values.meal}
                    />
                    <span>hrs/meal</span>
                </label>
                {customField.map((field) => (
                    <label htmlFor="custom">How long do typically spend {field}?
                        <input
                            id={field}
                            name={field}
                            type="number"
                            min="0"
                            onChange={formik.handleChange}
                            value={formik.values[field]}
                        />
                        <span>hrs/day</span>
                    </label>
                ))}

                <button type="submit">Submit</button>
            </form>
            <div>
                <label htmlFor="custom">Add your own custom event:
                    <input
                        id="custom"
                        name="custom"
                        type="string"
                        onChange={e => { setCustom(e.target.value) }}
                    />
                </label>
                <button onClick={addEntry}>Add field</button>
            </div>
        </div>
    )
}

function Home(props) {
    const { eventEntries, setEventEntries } = props;
    const [fixedEvents, setFixedEvents] = useState([]);
    const [otherEvents, setOtherEvents] = useState([]);


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
            console.log(JSON.stringify(otherEvents));
            var result = algorithm(fixedEvents, otherEvents, thisSunday)
            for (const fixedEvent of flattenEvents(fixedEvents)) {
                result.push(fixedEvent);
            }
            setEventEntries(result);
            navigate("/calendar")
        }
    }, [otherEvents])

    const testCal = () => {
        setEventEntries(fixedEvents);
        console.log(fixedEvents)
        navigate("/calendar")
    }


    //Aggregate form data
    const onSubmit = (values) => {
        const keys = Object.keys(values)
        var i = 0
        var array = []

        var currPriority = 3;
        while (i < keys.length) {
            var priority;
            var key = keys[i]
            switch (key) {
                case 'sleep':
                    priority = 0;
                    break;
                case 'meal':
                    priority = 1;
                    break;
                case 'study':
                    priority = 2;
                    break;
                default:
                    priority = currPriority;
                    currPriority += 1;
            }
            var curr = { name: key, time: values[key], priority: priority }
            array.push(curr);
            i++;
        }
        var sorted = sortByPriority(array)
        setOtherEvents(sorted)
        console.log(otherEvents)
    }

    // test calendar
    const navigate = useNavigate();

    return (
        <div className="container">
            <button type='button' onClick={() => testCal()}>
                Test calendar
            </button>
            {(Object.keys(fixedEvents).length === 0) ? <Upload setFixedEvents={setFixedEvents} /> : <Form submitHandler={onSubmit}></Form>}
        </div>
    );
}

export default Home;
