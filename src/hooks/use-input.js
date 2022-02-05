import { useState } from 'react';

const useInput = (validateInput) => {
  const [value, setValue] = useState('');
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
