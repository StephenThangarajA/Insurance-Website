import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStockBySymbol, reset } from '../redux/slices/stocksSlice';
import { buyStock, sellStock } from '../redux/slices/portfolioSlice';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';
import StockChart from '../components/StockChart';

function StockDetails() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [shares, setShares] = useState(1);
  const [orderType, setOrderType] = useState('buy');

  const { stock, isLoading, isError, message } = useSelector(
    (state) => state.stocks
  );

  const { user } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(getStockBySymbol(symbol));

    // Check if we're coming from portfolio with a sell action
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('action') === 'sell') {
      setOrderType('sell');
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, symbol, location]);

  const handleSharesChange = (e) => {
    setShares(e.target.value);
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleSubmitOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (orderType === 'buy') {
      dispatch(buyStock({
        stockId: stock.id,
        name: stock.name,
        shares: shares,
        price: stock.price
      }));
      navigate('/checkout');
    } else {
      // Handle sell order
      const portfolioItem = portfolio.find(s => s.symbol === stock.symbol);
      if (!portfolioItem || portfolioItem.shares < shares) {
        alert('Not enough shares to sell');
        return;
      }

      dispatch(sellStock({
        stockId: stock.id,
        shares: shares,
        price: stock.price
      }));
      navigate('/portfolio');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4">
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          {message}
        </div>
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="container mx-auto px-4">
        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-md">
          Loading stock data...
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {stock.name} ({stock.symbol})
        </h1>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white mr-4">
            ${stock.price.toFixed(2)}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isPositive
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
            {isPositive ? <ArrowTrendingUpIcon className="mr-1 h-4 w-4" /> : <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />}
            {`${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%)`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <StockChart historicalData={stock.historicalData} symbol={stock.symbol} />

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Company Overview
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-3 flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
                <span className="text-gray-900 dark:text-white">{stock.marketCap}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Volume</span>
                <span className="text-gray-900 dark:text-white">{stock.volume.toLocaleString()}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">P/E Ratio</span>
                <span className="text-gray-900 dark:text-white">{stock.pe.toFixed(2)}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dividend Yield</span>
                <span className="text-gray-900 dark:text-white">{stock.dividend.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Trade {stock.symbol}
            </h2>
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-2 px-4 rounded-md ${orderType === 'buy'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                onClick={() => handleOrderTypeChange('buy')}
              >
                Buy
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md ${orderType === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                onClick={() => handleOrderTypeChange('sell')}
              >
                Sell
              </button>
            </div>

            <div className="mb-6">
              <label htmlFor="shares" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shares
              </label>
              <input
                type="number"
                id="shares"
                min="1"
                value={shares}
                onChange={handleSharesChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mb-6"></div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Market Price
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${stock.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Estimated Cost
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${(stock.price * shares).toFixed(2)}
              </p>
            </div>

            <button
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              onClick={handleSubmitOrder}
            >
              {orderType === 'buy' ? 'Buy' : 'Sell'} {shares} {shares === 1 ? 'Share' : 'Shares'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDetails;