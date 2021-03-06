import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Formik } from 'formik';
import validator from 'validator';
import styles from '../styles/login.module.scss';
import FormError from '../../../components/form-elements/form-error/form-error';
import FormControl from '../../../components/form-elements/form-control/form-control';

class LoginComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  togglePasswordVisibility = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  onValidate = values => {
    const errors = {};
    Object.keys(values).forEach(key => {
      const value = (values[key] || '').toString();
      if (validator.isEmpty(value)) {
        errors[key] = 'This field is required';
      }

      if (key === 'email' && !validator.isEmail(values[key])) {
        errors[key] = 'Invalid email format';
      }
    });
    return errors;
  };

  renderFormError = (errors, touched, key) =>
    errors[key] && touched[key] ? <FormError>{errors[key]}</FormError> : [];



  render() {
    const { showPassword } = this.state;
    const { actionHandler } = this.props;

    return (
      <div className={styles.form}>
        <p className={styles.heading}>
          {' '}
          Sign In{' '}
        </p>
        <Formik
          enableReinitialize
          initialValues={{email: '', password: ''}}
          isInitialValid={false}
          onSubmit={values => actionHandler(values)}
          validate={values => this.onValidate(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            errors,
            values,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  fullWidth
                  label="Email address"
                  InputLabelProps={{ shrink: values['email'] !== '' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  
                />
                {this.renderFormError(errors, touched, 'email')}
              </FormControl>
              
                  <FormControl>
                    <TextField
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      label="Password"
                      InputProps={{
                        endAdornment: (
                          <Button className={styles.showButton} onClick={this.togglePasswordVisibility}>                            
                             {showPassword
                                ? 'Hide'
                                : 'Show'}                           
                          </Button>
                        ),
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      value={values['password'] ?? ''}
                    />
                    {this.renderFormError(errors, touched, 'password')}
                  </FormControl>
               
              
              <div className={styles['form-action']}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!isValid}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  actionHandler: PropTypes.func.isRequired,
};

export default LoginComponent;
