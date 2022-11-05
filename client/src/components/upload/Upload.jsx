import React, { useState } from "react";
import icsToJson from "ics-to-json";

function Upload() {
  const [jsonResult, setJsonResult] = useState({});

  const handleFile = async (e) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const result = icsToJson(readerEvent.target.result);
      setJsonResult(result);
      console.log(result);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      <input onChange={handleFile} type='file' />
    </div>
  );
}

export default Upload;
