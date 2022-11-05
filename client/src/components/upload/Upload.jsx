import React, { useEffect, useState } from "react";
import icsToJson from "ics-to-json";

function Upload(props) {
  const { setFixedEvents } = props;
  const [jsonResult, setJsonResult] = useState({});

  const icsJsonToCalendar = (icsJson) => {
    return icsJson.map(({ summary, startDate, endDate }) => {
      const entry = {
        title: summary,
        start: startDate,
        end: endDate,
      };
      return entry;
    });
  };

  const handleFileUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const result = icsToJson(readerEvent.target.result);
      setJsonResult(icsJsonToCalendar(result));
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    if (jsonResult) {
      setFixedEvents(jsonResult);
    }
  }, [jsonResult, setFixedEvents]);

  return (
    <div>
      <input onChange={handleFileUpload} type='file' />
    </div>
  );
}

export default Upload;
