import React from 'react';
import { uiActions } from '../../store/ui-store';
import { useDispatch } from 'react-redux';
import classes from './Notification.module.css';
let specialClass = '';

const Notification = (props) => {
  const dispatch = useDispatch();
  const closeNotification = () => {
    dispatch(uiActions.hideNotification())
  }
  if (props.status === 'error') {
    specialClass = classes.error;
  }
  if (props.status === 'success') {
    specialClass = classes.success;
  }
  const cssClasses = `${classes.notification} ${specialClass}`;
  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <button
        type="button"
        className="btn-close btn-close-white"
        aria-label="Close"
        onClick={closeNotification}
      ></button>
    </section>
  );
};

export default Notification;
