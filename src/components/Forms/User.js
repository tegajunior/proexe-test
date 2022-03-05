import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/user-store';
import useInput from '../../hooks/use-input';

const User = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const newId = useSelector((state) => state.users.nextId);
  const {
    value: enteredFirstName,
    hasError: enteredFirstNameHasError,
    isValid: enteredFirstNameIsValid,
    inputChangeHandler: firstNameInputChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
  } = useInput((value) => value.trim() !== '' && value.trim().length > 4, "name");

  const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const {
    value: enteredEmail,
    hasError: enteredEmailHasError,
    isValid: enteredEmailIsValid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput((value) => value.trim() !== '' && regexEmail.test(value.trim()), "email");

  const sendUserData = async (data) => {
    
    const url = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${
      props.id ? props.id : ''
    }`;
    const res = await fetch(url, {
      method: `${props.id ? 'PUT' : 'POST'}`,
      body: JSON.stringify({ data }),
    });
    if (props.id) {
      
      dispatch(userActions.editUser({ user: data, id: props.id }));
    } else {
      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      if (!props.id) {
        dispatch(userActions.addUserToItems(data));
      }
    }
    history.replace('/');
  };
  const cancel = () => {
    history.replace('/');
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!enteredFirstNameIsValid || !enteredEmailIsValid) return;

    const newUserData = {
      id: newId,
      name: enteredFirstName,
      phone: '1-770-736-8031 x56442',
      username: enteredFirstName + newId,
      website: 'hildegard.org',
      email: enteredEmail,
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };
    try {
      sendUserData(newUserData);
    } catch (error) {

    }
  };

  let formIsValid = false;
  if (props.id) {
    formIsValid = true;
  } else {
    if (enteredFirstNameIsValid && enteredEmailIsValid) {
      formIsValid = true;
    }
  }
  const firstNameInputClasses = `form-control ${
    enteredFirstNameHasError ? 'invalid' : ''
  }`;

  const emailInputClasses = `form-control ${
    enteredEmailHasError ? 'invalid' : ''
  }`;
  return (
    <div className="card mt-5 w-75 mx-auto">
      <div className="card-header d-flex justify-content-between align-items-center py-3">
        <h5 className="card-title">Form</h5>
      </div>
      <div className="card-body p-4">
        <form onSubmit={onSubmitHandler}>
          <div>
            <div className={firstNameInputClasses}>
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                id="firstName"
                onChange={firstNameInputChangeHandler}
                onBlur={firstNameInputBlurHandler}
                value={enteredFirstName}
              />
              {enteredFirstNameHasError && (
                <p className="error-text">Name must be at least 5 chars long</p>
              )}
            </div>
          </div>
          <div className={emailInputClasses}>
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="text"
              id="email"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {enteredEmailHasError && (
              <p className="error-text">Invalid Email</p>
            )}
          </div>
          <div className="form-actions">
            <button className="btn btn-outline-danger btn-sm" onClick={cancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm"
              disabled={!formIsValid}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
