import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Dropzone from 'react-dropzone';

const ffmpeg = createFFmpeg({ log: true });
await ffmpeg.load();



const FileConverter = () => {
    const [file, setFile] = useState(null);
    const [convertedFile, setConvertedFile] = useState(null);
    const [loader, setLoader] = useState(false)

    const convertToMP4 = async (file) => {
        setLoader(true)
        console.log("file",file)
        // Load the input file
        ffmpeg.FS('writeFile', 'input.mov', await fetchFile(file));
      
        // Run the conversion command
        await ffmpeg.run('-i', 'input.mov', 'output.mp4');
        console.log("ffmpeg converted", ffmpeg)
        
        // Fetch the converted file
        const data = ffmpeg.FS('readFile', 'output.mp4');
        console.log("data", data)
      
        // Create a URL for the converted file
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        console.log("url",url)
        setLoader(false);
        setConvertedFile(url);
        // Download the converted file
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'output.mp4';
        // link.click();
    };

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    return (
        <div>
            <h1>File Converter</h1>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag and drop a file here, or click to select a file</p>
                    </div>
                )}
            </Dropzone>
            {file && (
                <div>
                    <h2>Converting: {file.name}</h2>
                    <button onClick={() => convertToMP4(file)}>Convert to MP4</button>
                </div>
            )}
            {loader && "loading..."}
            {convertedFile && (
                <video controls>
                    <source src={convertedFile} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default FileConverter;