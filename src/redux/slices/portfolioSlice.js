import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import portfolioService from '../../services/portfolioService';

const initialState = {
  portfolio: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getPortfolio = createAsyncThunk(
  'portfolio/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await portfolioService.getPortfolio(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const buyStock = createAsyncThunk(
  'portfolio/buy',
  async (stockData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await portfolioService.buyStock(stockData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sellStock = createAsyncThunk(
  'portfolio/sell',
  async (stockData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await portfolioService.sellStock(stockData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolio = action.payload;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.portfolio = [];
      })
      .addCase(buyStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolio = action.payload;
      })
      .addCase(buyStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.portfolio = [];
      })
      .addCase(sellStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.portfolio = action.payload.portfolio;
      })
      .addCase(sellStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.portfolio = [];
      });
  },
});

export const { reset } = portfolioSlice.actions;
export default portfolioSlice.reducer;