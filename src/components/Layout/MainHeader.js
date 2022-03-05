import React from 'react';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={`${classes.header} bg-primary`}>
      <h1>Welcome</h1>
    </header>
  );
};

export default MainHeader;
