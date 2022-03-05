import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/user-store';

const EditUser = () => {
  const params = useParams();
  const history = useHistory();
  const id = params.userId;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const existingUser = users.find((user) => user.id === +id);
  if (existingUser) {
    dispatch(
      userActions.setEditData({
        name: existingUser.name,
        email: existingUser.email,
      })
    );
  }
  const [name, setName] = useState(existingUser.name);
  const [email, setEmail] = useState(existingUser.email);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const cancel = () => {
    history.push('/');
  };

  const nameInputBlurHandler = () => {
    setNameIsTouched(true);
  };

  const nameInputChangeHandler = (e) => {
    setNameIsTouched(true);
    setName(e.target.value);
  };

  const validateName = (value) => {
    return value.trim() !== '' && value.trim().length > 4;
  };
  const nameIsValid = validateName(name);
  const nameHasError = nameIsTouched && !nameIsValid;

  const validateEmail = (value) => {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return value.trim() !== '' && regexEmail.test(value.trim());
  };

  const emailInputChangeHandler = (e) => {
    setEmailIsTouched(true);
    setEmail(e.target.value);
  };

  const emaiInputBlurHandler = () => {
    setEmailIsTouched(true);
  };

  const emaiIsValid = validateEmail(email);
  const emailHasError = emailIsTouched && !emaiIsValid;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUserData = {
      id,
      name: name,
      phone: '1-770-736-8031 x56442',
      username: existingUser.username,
      website: existingUser.website,
      email: email,
      address: existingUser.address,
      company: existingUser.company
    };
    const url = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ newUserData }),
    });
    if (res.ok) {
      // 
    }
    dispatch(userActions.editUser({ user: newUserData, id }));
    history.push('/');
  };


  let formIsValid = false;

  if (nameIsValid && emaiIsValid) {
    formIsValid = true;
  }
  const firstNameInputClasses = `form-control ${nameHasError ? 'invalid' : ''}`;

  const emailInputClasses = `form-control ${emailHasError ? 'invalid' : ''}`;
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
                onChange={nameInputChangeHandler}
                onBlur={nameInputBlurHandler}
                value={name}
              />
              {nameHasError && (
                <p className="error-text">Name must be at least 5 chars long</p>
              )}
            </div>
          </div>
          <div className={emailInputClasses}>
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={emailInputChangeHandler}
              onBlur={emaiInputBlurHandler}
            />
            {emailHasError && <p className="error-text">Invalid Email</p>}
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

export default EditUser;
