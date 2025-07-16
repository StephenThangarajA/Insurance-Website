import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import stocksReducer from './slices/stocksSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stocks: stocksReducer,
    portfolio: portfolioReducer,
  },
});