import React, { useState } from "react";

const VideoConverter = () => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileChange = (e) => {
    const acceptedTypes = ["video/mp4", "video/webm", "video/mov", "video/quicktime"];
    console.log(e.target.files[0])
    if (acceptedTypes.includes(e.target.files[0].type)) {
      setFile(e.target.files[0]);
    } else {
      alert("Please select a valid video file (mp4, webm, or mov)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader)
      const videoBlob = new Blob([reader.result], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      console.log(videoUrl,videoBlob)
      setConvertedFile(videoUrl);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
        <h1>Using Blob</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>

      {convertedFile && (
        <video controls>
          <source src={convertedFile} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoConverter;