import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
}));

export const Dropzone = ({ input }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    setFiles([...files, ...acceptedFiles]);
    input.onChange([...files, ...acceptedFiles]);
  }, [input, files]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone(
    { onDrop, accept: ['image/png', 'image/bmp', 'image/jpeg'] },
  );

  const handleRemoveFile = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const filesList = files.map(file => (
    <li key={file.path}>
      {file.path}
      <button type="button" onClick={() => handleRemoveFile(file)}>Remove File</button>
    </li>
  ));

  return (
    <div>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image files here...</p>
        ) : (
          <p>Drag and drop image files here, or click to select files</p>
        )}
      </div>
      <ul>{filesList}</ul>
    </div>
  );
};
