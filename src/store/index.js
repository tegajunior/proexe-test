import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui-store';
import userReducer from './user-store';

const store = configureStore({
  reducer: { ui: uiReducer, users: userReducer },
});

export default store