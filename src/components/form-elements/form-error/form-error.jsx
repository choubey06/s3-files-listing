import React from 'react';
import PropTypes from 'prop-types';
import styles from './form-error.module.scss';

const FormError = props => {
  const { children } = props;
  return (
    <div className={styles['container']}>
      <i className="material-icons"> cancel </i>
      <p> {children} </p>
    </div>
  );
};

FormError.propTypes = {
  children: PropTypes.any.isRequired,
};

export default FormError;
