import React from 'react';
import PropTypes from 'prop-types';
import styles from './form-control.module.scss';

const FormControl = props => {
  const { children, className } = props;
  return (
    <div className={`${styles['container']} ${className || ''}`}>
      {children}
    </div>
  );
};

FormControl.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

FormControl.defaultProps = {
  className: '',
};

export default FormControl;
