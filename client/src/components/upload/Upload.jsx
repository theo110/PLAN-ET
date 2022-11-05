import React, { useEffect, useState } from "react";
import moment from "moment";
import icsToJson from "ics-to-json";
import sortEvents from "../../utils/eventSorter";
/*import { useDropzone } from "React-dropzone";

function Dropzone({ open }) {
  const { getRootProps, getInputProps } = useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">
          Drop .ics Files Here
        </p>
      </div>
    </div>
  );
}
*/

function Upload(props) {
  const { setFixedEvents } = props;
  const [parsedCalendarEvents, setParsedCalendarEvents] = useState([]);

  const jsonToCalendar = (icsJson) => {
    return icsJson.map(({ summary, startDate, endDate }) => {
      const entry = {
        title: summary,
        start: moment(startDate),
        end: moment(endDate),
      };
      return entry;
    });
  };

  const handleFileUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const result = icsToJson(readerEvent.target.result);
      setParsedCalendarEvents(sortEvents(jsonToCalendar(result)));
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    if (parsedCalendarEvents) {
      setFixedEvents(parsedCalendarEvents);
    }
    console.log(parsedCalendarEvents);
  }, [parsedCalendarEvents, setFixedEvents]);

  return (
    <div>
      <input onChange={handleFileUpload} type='file' />
    </div>
  );
}

export default Upload;
