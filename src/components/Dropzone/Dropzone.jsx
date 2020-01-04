import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  const onDrop = useCallback(acceptedFiles => {
    input.onChange(acceptedFiles);
  }, [input]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: ['image/png', 'image/bmp', 'image/jpeg'] });

  return (
    <div {...getRootProps()} className={classes.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image files here...</p>
      ) : (
        <p>Drag and drop image files here, or click to select files</p>
      )}
    </div>
  );
};
