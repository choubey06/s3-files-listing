import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/list-files.module.scss';

function ListFiles(props) {
  const greeting = 'Hello Function Component!';
  return <div><p className={styles.heading}>
  {' '}
  S3 Files{' '}
</p>{props.s3Files && props.s3Files.map(file => (<div className={styles.files}>{file?.Key}</div>))}</div>;
}

ListFiles.propTypes = {
    s3Files: PropTypes.array.isRequired,
};
 
export default ListFiles;
