import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorNotification.module.css';

const ErrorNotification = ({ name }) => {
  return (
    <div className={styles.errorNotification}>
      {name}
      <br /> is already in contacts.
    </div>
  );
};

ErrorNotification.propTypes = {
  name: PropTypes.any,
};

export default ErrorNotification;
