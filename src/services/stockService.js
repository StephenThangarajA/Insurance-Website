import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stocks/';

// Get all stocks
const getStocks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get stock by symbol
const getStockBySymbol = async (symbol) => {
  const response = await axios.get(API_URL + symbol);
  return response.data;
};

const stockService = {
  getStocks,
  getStockBySymbol,
};

export default stockService;