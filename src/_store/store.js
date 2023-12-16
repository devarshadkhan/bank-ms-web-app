// store.js
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export default store;
