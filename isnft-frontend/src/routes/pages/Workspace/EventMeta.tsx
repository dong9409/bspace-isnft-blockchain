import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
type Props = {
  loadJson: Function;
};

const EventMeta = (props: Props) => {
  /* Router */
  /* State */
  const { loadJson } = props;
  /* Functions */
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const fileReader = new FileReader();
    fileReader.readAsText(acceptedFiles[0], 'UTF-8');
    fileReader.onload = (e: any) => {
      console.log('e.target.result', e.target.result);
      loadJson(e.target.result);
    };
    // const data = JSON.parse(acceptedFiles[0]);
    // console.log(data);
  }, []);
  /* Hooks */
  /* Render */

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid lightgray',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
          }}
        >
          Drag 'n' drop Meta Data files here, or click to select files
        </p>
      )}
    </div>
  );
};

export default EventMeta;
