import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-store';

const useInput = (validateInput, inputType) => {
  const dispatch = useDispatch();
  let currentVal = '';
  const [value, setValue] = useState(currentVal);
  dispatch(userActions.clearEditData());
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInput(value);
  const hasError = isTouched && !isValid;

  const inputChangeHandler = (e) => {
    setIsTouched(true);
    setValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isTouched,
    hasError,
    isValid,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
