import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() => ({
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '5px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
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
      <IconButton
        color="secondary"
        aria-label="remove file"
        size="small"
        onClick={() => handleRemoveFile(file)}
      >
        <ClearIcon />
      </IconButton>
    </li>
  ));

  return (
    <div>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image files here...</p>
        ) : (
          <p>Drag and drop images here, or click to select files</p>
        )}
      </div>
      <ul>{filesList}</ul>
    </div>
  );
};
