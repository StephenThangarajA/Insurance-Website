import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolio/';

const getPortfolio = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const buyStock = async (stockData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'buy', stockData, config);
  return response.data;
};

const sellStock = async (stockData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'sell', stockData, config);
  return response.data;
};

const portfolioService = {
  getPortfolio,
  buyStock,
  sellStock,
};

export default portfolioService;