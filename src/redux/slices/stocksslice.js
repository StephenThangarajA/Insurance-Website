import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stockService from '../../services/stockService';

const initialState = {
  stocks: [],
  stock: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const getStocks = createAsyncThunk(
  'stocks/getAll',
  async (_, thunkAPI) => {
    try {
      return await stockService.getStocks();
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

export const getStockBySymbol = createAsyncThunk(
  'stocks/getBySymbol',
  async (symbol, thunkAPI) => {
    try {
      return await stockService.getStockBySymbol(symbol);
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

export const stocksSlice = createSlice({
  name: 'stocks',
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
      .addCase(getStocks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stocks = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStockBySymbol.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockBySymbol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stock = action.payload;
      })
      .addCase(getStockBySymbol.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = stocksSlice.actions;
export default stocksSlice.reducer;