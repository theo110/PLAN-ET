import React, { useEffect, useState, useCallback, useMemo } from "react";
import moment from "moment";
import icsToJson from "ics-to-json";
import { sortEvents } from "../../utils/eventSorter";
import { splitEventsByDay } from "../../utils/momentOperations";
import { useDropzone } from "react-dropzone";
import { GrFormUpload } from "react-icons/gr";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  margin: "20px 25vw 20px 25vw",
  height: "25vh",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#fca326",
  borderStyle: "dashed",
  backgroundColor: "#fffaf5",
  color: "#e24329",
  outline: "none",
  transition: "border .20s ease-in-out",
};
const focusedStyle = {
  borderColor: "#e24329",
};
const acceptStyle = {
  borderColor: "#00e676",
};
const rejectStyle = {
  borderColor: "#ff1744",
};

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

  function Dropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      const extension = acceptedFiles[0].type;
      if (extension !== "text/calendar") {
        alert("Please upload an .ics file");
      } else {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const result = icsToJson(readerEvent.target.result);
          setParsedCalendarEvents(splitEventsByDay(sortEvents(jsonToCalendar(result))));
        };
        reader.readAsText(acceptedFiles[0]);
      }
    }, []);
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ onDrop });

    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );

    return (
      <section className='container'>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div className="input-icon">
            <GrFormUpload size={100} />
          </div>
          <p>Drag 'n' drop the .ics file here, or click to select your .ics file</p>
        </div>
      </section>
    );
  }

  useEffect(() => {
    if (parsedCalendarEvents) {
      setFixedEvents(parsedCalendarEvents);
    }
    console.log(parsedCalendarEvents);
  }, [parsedCalendarEvents, setFixedEvents]);

  return (
    <div>
      <Dropzone />
    </div>
  );
}

export default Upload;
